import React from 'react';
import { Component } from 'react/cjs/react.production.min';

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
    
    }

    connectWalletButton = () => {
        return (
            <div>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
            <button onClick={this.connectWalletHandler} id="connect-wallet" className="mx-auto rounded-md p-2 bg-purple-700 text-white underline decoration-double">
                Connect Wallet  ➤➤➤ Enter App
            </button>
            </div>
        )
    }
    componentDidMount = () => {
        this.checkWalletIsConnected();
    };
    render() {
      return (
        <div id="about-page">
            {this.state.currentAccount ? "this.showAbout()" : this.connectWalletButton()}
        </div>

      );
    }
}

export default ConnectWallet;
