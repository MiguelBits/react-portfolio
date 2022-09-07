# Code Walkthrough

#### OlympusAccessControlled.sol <a href="#heading-olympusaccesscontrolledsol" id="heading-olympusaccesscontrolledsol"></a>

[OlympusAccessControlled](https://github.com/OlympusDAO/olympus-contracts/blob/0646cc499d7af8a135f9bf6c653e2c62299f52a1/contracts/types/OlympusAccessControlled.sol) is a simple contract that manages which addresses have permissions across the four main roles in the Olympus protocol: Governor, Guardian, Policy, and Vault. The contract also provides function modifiers to restrict access to a specific role. OlympusAuthority.sol implements this contract as well and provides push/pull functions to assign the roles. This is similar to the OpenZeppelin Ownable and AccessControl contracts. As a practical matter, the roles are currently set to these addresses in production:

* Governor = [DAO Multi-sig Contract](https://etherscan.io/address/0x245cc372c84b3645bf0ffe6538620b04a217988b)
* Guardian = [DAO Multi-sig Contract](https://etherscan.io/address/0x245cc372c84b3645bf0ffe6538620b04a217988b)
* Policy = [Policy Multi-sig Contract](https://etherscan.io/address/0x0cf30dc0d48604a301df8010cdc028c055336b2e)
* Vault = [Treasury Contract](https://etherscan.io/address/0x9a315bdf513367c0377fb36545857d12e85813ef)

#### FrontEndRewarder.sol <a href="#heading-frontendrewardersol" id="heading-frontendrewardersol"></a>

The purpose of the [FrontEndRewarder contract](https://github.com/OlympusDAO/olympus-contracts/blob/0646cc499d7af8a135f9bf6c653e2c62299f52a1/contracts/types/FrontEndRewarder.sol) is to manage the accrual and distribution of rewards to the DAO and Front-end Operators (FEOs) that are earned when users deposit funds to the BondDepository. The contract is `abstract`, which means it is not meant to be deployed by itself.

The contract has the following functionality:

* Allows the Governor role to set the reward rates for the DAO and FEOs -> `setRewards(uint256 _toFrontEnd, uint256 _toDAO)`
* Allows the Policy role to whitelist new FEO addresses for rewards -> `whitelist(address _operator)`
* Allows the DAO and FEOs to withdraw their current reward balance in OHM

#### INoteKeeper.sol <a href="#heading-inotekeepersol" id="heading-inotekeepersol"></a>

The INoteKeeper contract implements the data structures used in the NoteKeeper contract and provides the external function specifications.

```solidity
 // Info for market note
    struct Note {
        uint256 payout; // gOHM remaining to be paid
        uint48 created; // time market was created
        uint48 matured; // timestamp when market is matured
        uint48 redeemed; // time market was redeemed
        uint48 marketID; // market ID of deposit. uint48 to avoid adding a slot.
    }
```

The `Note` struct shows the data stored for each user Note to be paid out. One clever thing done here is the use of the `uint48` variable size inside of structs to store timestamps. Timestamps on the EVM are stored in Unix format, which means the number of seconds since the Unix Epoch (January 1st, 1970 at 00:00:00 UTC). The current Unix timestamp is 1,643,056,135 seconds. A `uint48` can store an integer up to 281,474,976,710,655. Therefore, it won't overflow until \~8.9 million years from now. A smaller size, like `uint32` would overflow in \~150 years. Of course, you could just use the max size and never worry about it, but 8.9 million years is probably enough time. In addition, since these variables are inside a struct, the four `uint48` values will only take up one 256-bit storage slot. This saves gas on the creation of each data element.

The external functions here can be broken into a couple main sections:

* Retrieving payouts once Notes are vested: `redeem` and `redeemAll`
* Note transfers (NFT-like functionality): `pushNote` and `pullNote`
* View functions for getting Notes for a particular user: `indexesFor` and `pendingFor` We'll dive into these in the next section.

## NoteKeeper.sol <a href="#heading-notekeepersol" id="heading-notekeepersol"></a>

The purpose of the [NoteKeeper contract](https://github.com/OlympusDAO/olympus-contracts/blob/0646cc499d7af8a135f9bf6c653e2c62299f52a1/contracts/types/NoteKeeper.sol) is to **handle all the data and functionality related to the Notes users receive when they deposit funds in the BondDepository**.

To keep track of user information and actions, the contract implements these data structures:

```solidity
mapping(address => Note[]) public notes; // user deposit data
mapping(address => mapping(uint256 => address)) private noteTransfers; // change note ownership
```

The contract has the following functionality:

* Add a new Note (on user deposit)
* Transfer a Note to another address
* View pending Notes and get the status of a Note
* Update Treasury address to mint payout rewards from

### **Add a new Note**

```solidity
/**
 * @notice             adds a new Note for a user, stores the front end & DAO rewards, and mints & stakes payout & rewards
 * @param _user        the user that owns the Note
 * @param _payout      the amount of OHM due to the user
 * @param _expiry      the timestamp when the Note is redeemable
 * @param _marketID    the ID of the market deposited into
 * @return index_      the index of the Note in the user's array
 */
function addNote(
    address _user,
    uint256 _payout,
    uint48 _expiry,
    uint48 _marketID,
    address _referral
) internal returns (uint256 index_) {
    // the index of the note is the next in the user's array
    index_ = notes[_user].length;

    // the new note is pushed to the user's array
    notes[_user].push(
        Note({
            payout: gOHM.balanceTo(_payout),
            created: uint48(block.timestamp),
            matured: _expiry,
            redeemed: 0,
            marketID: _marketID
        })
    );

    // front end operators can earn rewards by referring users
    uint256 rewards = _giveRewards(_payout, _referral);

    // mint and stake payout
    treasury.mint(address(this), _payout + rewards);

    // note that only the payout gets staked (front end rewards are in OHM)
    staking.stake(address(this), _payout, false, true);
}
```

The `addNote` function is called from the BondDepository `deposit` function that we'll review shortly. The parameters align with the information needed to create a new `Note`:

* The `user` is the address that called deposit and who will own the `Note`. Notes are stored in a mapping from address to a dynamic array of Notes: `mapping(address => Note[]) notes`. This means each user has a list of Notes that they own.
* The `payout` value is computed in the deposit function as a number of OHM and passed here (as seen in the diagram above). The amount is then converted to a number of gOHM to store in the Note.
* The `expiry` value is the current timestamp plus the vesting period (or the fixed vesting expiration).
* The `marketId` value is the ID of the Bond Market that the `Note` is being added for.
* The `referral` value is the address of the Front End Operator (FEO) that gets the reward for the bond.

The `_giveRewards` function is called with the `referral` (FEO) address and the `payout` amount to calculate and allocate DAO and FEO rewards.

OHM is minted from the treasury to cover both the payout and rewards. The `payout` is then staked in the Staking contract and the contract receives gOHM (the false in the 3rd param means to send the non-rebasing token) to later pay to the user. This is where the "auto-staking" of the V2 Bonds is implemented.

### **Transfer Notes**

OlympusDAO has implemented new functionality in the V2 Bonds to make the debt (i.e. Notes) payable to users after they bond assets transferable to other users. This provides liquidity for users should they need it during the vesting period and opens up the possibility for a credit market (e.g. US Treasuries are tradable). Here is a short-clip reviewing the `pushNote` and `pullNote` functions that enable this feature.

[https://www.loom.com/share/f8ba8a8b56544f9e854bcc9699d84607](https://www.loom.com/share/f8ba8a8b56544f9e854bcc9699d84607)

This is an interesting feature that has been added, but it will require OlympusDAO or other developers to build solutions on top of the basics to create a true market.

### **Redeeming Notes**

The Note redemption functionality in the V2 Bonds is simple, but an improvement over the V1 Bonds by allowing users to claim payouts from multiple bonds at once. This is mostly a result of the BondDepository being able to track multiple markets and notes per market for each user. The following video walks through the `redeem`, `redeemAll`, and helper functions.

## IBondDepository.sol

The IBondDepository contract implements the data structures used in the BondDepository contract to track Bond Markets and provides the external function specifications.

```solidity
// Info about each type of market
    struct Market {
        uint256 capacity; // capacity remaining
        IERC20 quoteToken; // token to accept as payment
        bool capacityInQuote; // capacity limit is in payment token (true) or in OHM (false, default)
        uint64 totalDebt; // total debt from market
        uint64 maxPayout; // max tokens in/out (determined by capacityInQuote false/true, respectively)
        uint64 sold; // base tokens out
        uint256 purchased; // quote tokens in
    }

    // Info for creating new markets
    struct Terms {
        bool fixedTerm; // fixed term or fixed expiration
        uint64 controlVariable; // scaling variable for price
        uint48 vesting; // length of time from deposit to maturity if fixed-term
        uint48 conclusion; // timestamp when market no longer offered (doubles as time when market matures if fixed-expiry)
        uint64 maxDebt; // 9 decimal debt maximum in OHM
    }

    // Additional info about market.
    struct Metadata {
        uint48 lastTune; // last timestamp when control variable was tuned
        uint48 lastDecay; // last timestamp when market was created and debt was decayed
        uint48 length; // time from creation to conclusion. used as speed to decay debt.
        uint48 depositInterval; // target frequency of deposits
        uint48 tuneInterval; // frequency of tuning
        uint8 quoteDecimals; // decimals of quote token
    }

    // Control variable adjustment data
    struct Adjustment {
        uint64 change;
        uint48 lastAdjustment;
        uint48 timeToAdjusted;
        bool active;
    }
```

Similar to the INoteKeeper contract, I'm going to focus on the the Data Structures in the interface and then review the functions when we get to their implementation in the BondDepository contract below.

The IBondDepository data structures are interesting because the first three structs (`Market`, `Term`, and `Metadata`) are all related to a Market and could be organized in several ways.

One explanation I could derive for how they are structured is to optimize gas costs on the `deposit` function. This function is the only non-view function that will be called by a regular user; therefore, it would be the prime target for optimization. With that in mind, we can see that each struct contains data with a specific characteristic (with some exceptions):

* **Market** - Data that needs to be _updated_ when a `deposit` transaction is sent.
  * `capacityInQuote`, `quoteToken`, and `maxPayout` are not updated, but they are related to the `capacity` variable and are stored with it.
* **Terms** - Data that needs to be _read_ when a `deposit` transaction is sent.
* **Metadata** - Data that is _not used_ in the `deposit` function (it is used in the internal functions it calls though).

Additionally, the variables are grouped into the structs next to data with similar units. All of the variables in `Metadata` are units of time except for `quoteDecimals` (which is stored as an optimization instead of being called each time it's needed).

Finally, the `Terms` and `Metadata` structs each only take up 1 storage slot since they take up 232 and 248 bytes respectively. I didn't find any specific cases where this would make a large difference, but I thought it was interesting to consider.

We can see that the variables we reviewed earlier that are required to create a Market and calculate the current price at any time during its life are stored in these data structures.

The `Adjustment` struct is specific to downward tuning adjustments of the Bond Control Variable.

## BondDepository.sol <a href="#heading-bonddepositorysol" id="heading-bonddepositorysol"></a>

Finally, we get to the [BondDepository contract](https://github.com/OlympusDAO/olympus-contracts/blob/0646cc499d7af8a135f9bf6c653e2c62299f52a1/contracts/BondDepository.sol) which pulls all the previous code together and implements the main Market management, user deposit, and pricing logic.

**Storage**

The storage layout for the contract is very straightforward. There is a dynamic array for each of the three main structs which is used to store information about each Market that is created. Each array will always be the same size because a single item is added to each on the creation of a Market. As a result, the items corresponding to a specific Market will have the same index (referred to as an `id`) in each array. This simplifies data access in multiple functions. There is also a mapping to store `Adjustments`. Each Market can only have one `Adjustment` at a time and so the mapping is from the Market `id` to the current `Adjustment`.

Apart from storage for the structs we discussed previously, there is a mapping from an address to an array of unsigned integers that collects all the Market IDs for a given Quote Token in one place. This is used to provide efficient queries to front-end interfaces, as we'll see later.

```
// Storage
Market[] public markets; // persistent market data
Terms[] public terms; // deposit construction data
Metadata[] public metadata; // extraneous market data
mapping(uint256 => Adjustment) public adjustments; // control variable changes

// Queries
mapping(address => uint256[]) public marketsForQuote; // market IDs for quote token
```

**Create and Close a Market**

New Markets can be created by the Olympus Policy Team by calling the `create` function. In order to do so, they have to provide the parameters that we studied earlier in the Bond Market simulation. To keep the function interface clean, they have been grouped into a couple different arrays. Here is a video where I walk through the implementation. [https://www.loom.com/share/86d8d082dd1d4ad8ae7867a164904776](https://www.loom.com/share/86d8d082dd1d4ad8ae7867a164904776)

Once created, the Market will automatically end once the capacity or conclusion time is reached. However, if required, the **Olympus Policy Team can end a Market early** by calling the `close` function. This will update the **conclusion of the Market to the current timestamp and set the capacity of the Market to zero to prevent any more deposits.**

### Interface View Functions

In order for the Bond Depository to be practically useful, we need some view functions that user interfaces can query to get information about the current Markets available and their prices. Olympus has implemented several of these for different purposes:

* `marketPrice` - provides the current price of a Market in Quote Tokens per Base Token (in base token decimals) and accounts for the decay of Debt and the Control Variable.
* `payoutFor` - provides the current amount of Base Tokens for an amount of Quote Tokens on a Market, accounting for the decay of Debt and the Control Variable.
* `liveMarkets` - returns the list of Market IDs that are active. Uses `isLive`.
* `liveMarketsFor` - returns the list of Market IDs that are active for a specific Quote Token. Uses `isLive`.

Additionally, there are several public helper functions which are leveraged by the view functions and can be called by external contracts or interfaces for information about the Bond Markets.

* `debtRatio` - provides the current debt ratio, accounting for the decay of Debt and the Control Variable. Used by `marketPrice`.
* `currentDebt` - provides the current Debt, accounting for decay. Used by `debtRatio`.
* `debtDecay` - provides the amount of Debt to decay at the current time from the last decay, used by `currentDebt`.
* `currentControlVariable` - provides the current Control Variable value, accounting for decay. Used by `marketPrice`.
* `isLive` - returns whether a given Market is accepting deposits. Used by `liveMarkets` and `liveMarketsFor`.

Lastly, there are also internal view functions `_marketPrice` and `_debtRatio` which provide the same calculations as the public functions without accounting for current decay. Other functions, like `deposit`, use these in cases where the stored values for Debt and the Control Variable have just been set so that there isn't any decay to apply. This saves gas in cases where we know the extra operations will result in zero values.

### **User Deposits**

Users bond assets with the Bond Depository using the `deposit` function. In addition, the deposit function is where all of the state changes are saved for Market variables updates over its lifespan. The function has a number of checks to ensure that the deposit is allowed to proceed and to protect the user from front-running bots. I walk through it in the following video:

[https://www.loom.com/share/3fc350817e204b19bb85fca4cd000a14](https://www.loom.com/share/3fc350817e204b19bb85fca4cd000a14)\
