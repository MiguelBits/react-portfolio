import React from 'react'
import './../css/Home.css';
import {contractAddress, contractABI} from '../contracts/contract_abi';
import { ethers } from 'ethers';

class Home extends React.Component {
  state = {
    Robot_planets_population: 0,
    God_planets_population: 0,
    Superhuman_planets_population: 0,
    Alien_planets_population: 0,
    Animal_planets_population: 0,
    Darklink_planets_population: 0
  }
  async mintNftHandler(class_id){
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.heroMint(class_id);

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        
        nftContract.Hero_inAccount().then(result => {
          //console.log(result[result.length-1]._hex)
          alert("You minted Hero Id: "+result[result.length-1]._hex)
        })


      } else {
        console.log("Ethereum object does not exist");
      }
      
      window.location.reload(false);

    } catch (err) {
      console.log(err);
    }
  }
  getPopulation(class_id){
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        nftContract.getPopulation(class_id).then(result => {
          switch(class_id){
            case 1: 
              this.setState({Robot_planets_population: result._hex})
              break;
            case 2:
              this.setState({God_planets_population: result._hex})
              break;
            case 3:
              this.setState({Superhuman_planets_population: result._hex})
              break;
            case 4:
              this.setState({Alien_planets_population: result._hex})
              break;
            case 5:
              this.setState({Animal_planets_population: result._hex})
              break;
            case 6:
              this.setState({Darklink_planets_population: result._hex})
              break;
            default:
              break;
          }
          //console.log(result._hex)
        })

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
    //console.log(this.state.planets_population);
  }
  
  componentDidMount = () => {
    this.getPopulation(1);
    this.getPopulation(2);
    this.getPopulation(3);
    this.getPopulation(4);
    this.getPopulation(5);
    this.getPopulation(6);
  }
  
  render() {
    return (
      <div id="home-page">
          <button onClick={() => this.mintNftHandler(1)} className="cyber_button">
            <span aria-hidden>Robot</span>
            <span aria-hidden className="cyber_button__tag">Population:{this.state.Robot_planets_population}</span>
            <img alt="" id="robot-planet" src="https://github.com/mcruzvas/react_web3/blob/main/public/planets/robot.png?raw=true"></img>
          </button>
          <p></p>
          <button onClick={() => this.mintNftHandler(2)} className="cyber_button">
            <span aria-hidden>God</span>
            <span aria-hidden className="cyber_button__tag">Population:{this.state.God_planets_population}</span>
            <img alt="" id="god-planet" src="https://github.com/mcruzvas/react_web3/blob/main/public/planets/god.png?raw=true"></img>
          </button>
          
          <button onClick={() => this.mintNftHandler(3)} className="cyber_button">
            <span aria-hidden>Superhuman</span>
            <span aria-hidden className="cyber_button__tag">Population:{this.state.Superhuman_planets_population}</span>
            <img alt="" id="superhuman-planet" src="https://github.com/mcruzvas/react_web3/blob/main/public/planets/superhuman2.png?raw=true"></img>
          </button>
          
          <button onClick={() => this.mintNftHandler(4)} className="cyber_button">
            <span aria-hidden>Alien</span>
            <span aria-hidden className="cyber_button__tag">Population:{this.state.Alien_planets_population}</span>
            <img alt="" id="alien-planet" src="https://github.com/mcruzvas/react_web3/blob/main/public/planets/alien.png?raw=true"></img>
          </button>
          <button onClick={() => this.mintNftHandler(5)} className="cyber_button">
            <span aria-hidden>Animal</span>
            <span aria-hidden className="cyber_button__tag">Population:{this.state.Animal_planets_population}</span>
            <img alt="" id="animal-planet" src="https://github.com/mcruzvas/react_web3/blob/main/public/planets/animal.png?raw=true"></img>
          </button>
          
          <button onClick={() => this.mintNftHandler(6)} className="cyber_button">
            <span aria-hidden>Darklink</span>
            <span aria-hidden className="cyber_button__tag">Population:{this.state.Darklink_planets_population}</span>
            <img alt="" id="darklink-planet" src="https://github.com/mcruzvas/react_web3/blob/main/public/planets/darklink4.png?raw=true"></img>
          </button>
          
      </div>
    )
  }
}

export default Home;
