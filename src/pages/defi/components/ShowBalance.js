import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import { ethers } from 'ethers';
import "./../css/Defi.css"

class ShowBalance extends Component {
    state={
      currentAccount: "",
      provider: "https://avalanche--fuji--rpc.datahub.figment.io/apikey/840b5505faa01184d4a81482f2a73112/ext/bc/C/rpc",
    }
    getAvaxBalance = async () => {
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

          //get balance
          var customHttpProvider = new ethers.providers.JsonRpcProvider(this.state.provider);
          const balance = await customHttpProvider.getBalance(accounts[0])
          console.log(ethers.utils.formatEther(balance))

          
          
      } else {
          console.log("No authorized account found");
      }

    }

    componentDidMount = () => {
      this.getAvaxBalance()
    };

    render() {
      return (
        <div >
            <div className="ShowBalance">
                
            </div>
        </div>

      );
    }
}

export default ShowBalance;
