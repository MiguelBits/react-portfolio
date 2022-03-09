import React from 'react';
import { toast } from 'react-toastify';
import { Component } from 'react/cjs/react.production.min';
import "./../css/Defi.css"

class ConnectWallet_Defi extends Component {
    state = {
        currentAccount: null,
        network: {
            avalancheFuji: {
                chainId: `0x${Number(43113).toString(16)}`,
                chainName: "Avalanche Fuji Testnet",
                nativeCurrency: {
                    name: "AVAX",
                    symbol: "AVAX",
                    decimals: 18
                },
                rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
                blockExplorerUrls: ["https://testnet.snowtrace.io/"]
            }
        }
    }
    
    handleNetworkSwitch = async () => {
        toast("Allow to change network")
        try {
            if (!window.ethereum) throw new Error("No crypto wallet found");
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [this.state.network["avalancheFuji"]]
            });
            toast("Welcome to Avalanche Fuji Testnet")
          } catch (err) {
              toast("Wrong RPC URL")
          }
      };

    checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account: ", account);
            this.setState({currentAccount: account});
        } else {
            console.log("No authorized account found");
        }
        
    }

    connectWalletHandler = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please install Metamask!");
        }


        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Found an account! Address: ", accounts[0]);
            this.setState({accounts:accounts[0]});
            window.location.reload(false);
        } catch (err) {
            console.log(err)
        }
        
    }

    connectWalletButton = () => {
        return (
            <div>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
            <button onClick={this.connectWalletHandler} id="connect-wallet" className="mx-auto rounded-md p-2 bg-purple-700 text-white underline decoration-double">
                    Connect Wallet  ➤➤➤ 
                <a href="/nftDuel/Home" >Enter App</a>
            </button>
            </div>
        )
    }
    afterConnectWallet = () =>{
        return(
            <div>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
            <button >
                <a href="/nftDuel/Home" >Enter App</a>
            </button>
            </div>
        )
    }
    componentDidMount = () => {
        toast.configure()
        this.checkWalletIsConnected();
        document.body.style.backgroundImage = 'url("https://wallpaperaccess.com/full/130220.jpg")';
    };
    render() {
      return (
        <div className='connectwallet-page' id="home-page">
            <div>
                {this.state.currentAccount ? this.afterConnectWallet() : this.connectWalletButton()}
            </div>
            <button className="change-network" onClick={this.handleNetworkSwitch}> Change Network to Rinkeby Testnet</button>
        </div>

      );
    }
}

export default ConnectWallet_Defi;
