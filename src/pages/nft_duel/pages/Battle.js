import React from 'react';
import {contractAddress, contractABI} from '../contracts/contract_abi';
import { ethers } from 'ethers';
import './../css/Battle.css';
import "./../css/Duel.css"
import Nav from "./../components/Nav"


class Battle extends React.Component {
  state = {
    stakedPopulation: 0,
    stakedIDs: []
  }
  getStakedPopulation = () => {
    const { ethereum } = window;
      //console.log(id)
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
  
        nftContract.getStakedPopulation().then(result => {
          this.setState({stakedPopulation:result.length})
          this.setState({stakedIDs:result})
        });
        

      }else{
        console.log("Ethereum object does not exist");
      }
  }
  componentDidMount = () => {
    this.getStakedPopulation();
    document.body.style.backgroundImage = 'url("https://wallpaperaccess.com/full/130220.jpg")';
  }
  upgradeNftButton = (frase) => {
    return (
    <div id="form_overlay" className='shadow sm:rounded-lg'>
        <form onSubmit={this.upgradeNftHandler}>
        <div>
          <label id="unlock">{frase}</label>
          <input
            className='shadow sm:rounded-lg'
            id='form_input'
            value={this.state.boost_value}
            onChange={(e) => this.setState({boost_value: e.target.value})}
          />
          <button className="button-82-pushable">
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">
              Check ❔
            </span>
          </button>
        </div>
      </form>
    </div>
    )
  }
  Duel = (tokenId,enemyId) => {
    const { ethereum } = window;
      //console.log(id)
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
  
        nftContract.Duel(tokenId,enemyId);
        

      }else{
        console.log("Ethereum object does not exist");
      }
      window.location.reload(false);
  }
  render() {
    return (
      <div className='battle-page'>
          <Nav/>
        
          <div className='form-input'>
              <div className='form-input'>
                {this.upgradeNftButton("Hero1 Id")}
              </div>
              <div className='form-input' >
                {this.upgradeNftButton("Hero2 Id")}
              </div>
          </div>
            <button onClick={() => this.mintNftHandler(1)} className="battle_cyber_button">
              <span aria-hidden>Duel</span>
              <span aria-hidden className="battle_cyber_button__tag">Staked Population:{this.state.stakedPopulation}</span>
            </button>
            <img alt="" id="versus" src="https://images.vectorhq.com/images/istock/previews/8566/85666815-versus-screen-with-fire-frames.jpg"></img>

        
      </div>
    );
  }
}

export default Battle;
