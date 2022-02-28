import React from 'react';
import {contractAddress, contractABI} from '../contracts/contract_abi';
import { ethers } from 'ethers';
import './../css/Battle.css';
import "./../css/Duel.css"
import Nav from "./../components/Nav"


class Battle extends React.Component {
  state = {
    stakedPopulation: 0,
    stakedIDs: [],
    openDropMenu: false,
    playerHero: 0,
    enemyHero: 0,
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
          for(var i = 0; i < result.length;i++){
            const previous_state_element = this.state.stakedIDs;
            console.log(result[i])
            const updated_state_nft_element = previous_state_element.concat(parseInt(result[i]._hex))
            this.setState({stakedIDs:updated_state_nft_element})
          }
        });
        

      }else{
        console.log("Ethereum object does not exist");
      }
  }
  componentDidMount = () => {
    this.getStakedPopulation();
    document.body.style.backgroundImage = 'url("https://wallpaperaccess.com/full/130220.jpg")';
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
  handleOnClick = (item) => {
    this.setState({playerHero:item})
  }
  toggle = () => {
    this.setState({openDropMenu: !this.state.openDropMenu})
  }

  render() {
    return (
      <div>
          <Nav/>
          <div className="dd-wrapper">
              <div
                tabIndex={0}
                className="dd-header"
                role="button"
                onKeyPress={() => this.toggle(!this.state.openDropMenu)}
                onClick={() => this.toggle(!this.state.openDropMenu)}
              >
                <div className="dd-header__title">
                  <p className="dd-header__title--bold">Your Duel Galaxy Heroes:</p>
                </div>
                <div className="dd-header__action">
                  <p>{this.state.openDropMenu ? 'Close' : 'Open'}</p>
                </div>
              </div>
              {this.state.openDropMenu && (
                <ul className="dd-list">
                  {this.state.stakedIDs.map((item,i) => (
                    <li className="dd-list-item" key={i}>
                      <button type="button" onClick={() => this.handleOnClick(item)}>
                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          

        
      </div>
    );
  }
}

export default Battle;
