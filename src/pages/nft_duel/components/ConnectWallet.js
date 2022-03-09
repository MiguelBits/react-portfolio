import React from 'react';
import { toast } from 'react-toastify';
import { Component } from 'react/cjs/react.production.min';
import "./../css/Duel.css"

class ConnectWallet extends Component {
    state = {
        currentAccount: null
    }
    
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

        this.changeToHome()
        
    }

    connectWalletButton = () => {
        return (
            <div className='container-wallet'>
                <button onClick={this.connectWalletHandler} class='one-wallet'>Connect your wallet to play <b>NFT</b> games.</button>
            </div>
        )
    }
    afterConnectWallet = () =>{
        
        return(
            <div className='container-wallet'>
                <button onClick={this.changeToHome} class='one-wallet'>Click to enter the Galaxy <b>NFT</b> games.</button>
            </div>
        )
    }
    changeToHome(){
        window.location.href='/nftDuel/Home'
    }
    componentDidMount = () => {
        toast.configure()
        this.checkWalletIsConnected();
        document.body.style.backgroundImage = 'url("https://wallpaperaccess.com/full/130220.jpg")';
        toast.warning("Change your wallet network chain to Rinkeby Testnet !")

    };
    render() {
      return (
        <div className='connect-wallet-page'>
            <div id="about-page">
                {this.state.currentAccount ? this.afterConnectWallet() : this.connectWalletButton()}
            </div>
        </div>

      );
    }
}

export default ConnectWallet;
