import React from 'react'
import './../css/Collection.css';

import {contractAddress, contractABI} from '../contracts/contract_abi';
import { ethers } from 'ethers';
import { Component } from 'react/cjs/react.production.min';

class Collection extends Component {
    state = {
        collection_tokenId: [],
        collection_tokenName: [],
        collection_tokenImg: [],
        collection_tokenStars: [],
        collection_tokenClass: [],
        collection_tokenElement: [],
        collection_tokenAttack: [],
        collection_tokenStake:[],
        collection_stakedTimeLeft: [],
        boost_value: ''
      };
  
    async stake(id){
      const { ethereum } = window;
      //console.log(id)
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
  
        await nftContract.stake(id);
        

      }else{
        console.log("Ethereum object does not exist");
      }
      window.location.reload(false);
    }
    async unstake(id){
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        try{
          await nftContract.unstake(id);
        }catch(e){
          alert("Need to wait more time!")
        }
        
      }else{
        console.log("Ethereum object does not exist");
      }

    }
    stakedTimeLeft(i){
      let time = this.state.collection_stakedTimeLeft[i]
      
      if(this.state.collection_stakedTimeLeft[i] !== 0){
        return (<div>
                  <p id="unstake" className='getStakedTimeLeft'>{time}</p>
                  <img id="clock-stakedTimeLeft" alt="clock" src="https://github.com/mcruzvas/react_web3/blob/battle_staked-version1/public/clock2.png?raw=true"></img>
                </div>)
      } else{
        return ""
      }
      
    }
    collectionNftHandler = async () => {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
  
        let data = await nftContract.Hero_inAccount();
        // get NFT metadata
        for(var i = 0;i<=data.length-1;i++){
          const tokenId = data[i].toString()
          //add staked time if there is one
          
          nftContract.uri(data[i]).then(urlValue => {
            //console.log(urlValue)
            fetch(urlValue)
                .then(response => response.json())
                .then((jsonData) => {
                  //update local storage listed by tokenId
                  //id
                  const previous_state_tokenId = this.state.collection_tokenId;
                  const updated_state_nft_tokenId = previous_state_tokenId.concat(tokenId)
                  this.setState({collection_tokenId: updated_state_nft_tokenId})
                  //img
                  const previous_state_tokenImg= this.state.collection_tokenImg;
                  const updated_state_nft_tokenImg = previous_state_tokenImg.concat(jsonData.image)
                  this.setState({collection_tokenImg: updated_state_nft_tokenImg})
                  //name
                  const previous_state_tokenName = this.state.collection_tokenName;
                  const updated_state_nft_tokenName = previous_state_tokenName.concat(jsonData.name)
                  this.setState({collection_tokenName: updated_state_nft_tokenName})
                  //class
                  const previous_state_class = this.state.collection_tokenClass;
                  const updated_state_nft_class = previous_state_class.concat(jsonData.properties.class)
                  this.setState({collection_tokenClass: updated_state_nft_class})
                  //element
                  const previous_state_element = this.state.collection_tokenElement;
                  const updated_state_nft_element = previous_state_element.concat(jsonData.properties.element)
                  this.setState({collection_tokenElement: updated_state_nft_element})
                })
          })
          nftContract.getNFT_attack(data[i]).then(result => {
            //attack
            const previous_state_attack = this.state.collection_tokenAttack;
            const updated_state_nft_attack = previous_state_attack.concat(parseInt(result._hex.toString()))
            this.setState({collection_tokenAttack: updated_state_nft_attack})
          })
          nftContract.getNFT_stars(data[i]).then(result => {
            //stars
            const previous_state_stars = this.state.collection_tokenStars;
            const updated_state_nft_stars = previous_state_stars.concat(parseInt(result._hex.toString()))
            this.setState({collection_tokenStars: updated_state_nft_stars})
          })
          nftContract.getNFT_staked(data[i]).then(result => {
            //staked
            const previous_state_stake = this.state.collection_tokenStake;
            const updated_state_nft_stake = previous_state_stake.concat(result);
            this.setState({collection_tokenStake: updated_state_nft_stake})
          })
          nftContract.getStakedTimedLeft(data[i]).then(result=>{
            //time left result
            console.log(parseInt(result._hex.toString()))
            const previous_state_element = this.state.collection_stakedTimeLeft;
            const updated_state_nft_element = previous_state_element.concat(parseInt(result._hex.toString()))
            this.setState({collection_stakedTimeLeft: updated_state_nft_element})
          })
        }
      } 
      else {
        console.log("Ethereum object does not exist");
      }
  }
  
  printStars(stars){
    let final_str = "✪";
    for (var i = 1; i < stars; i++) {
      final_str += "✪"
    }
    //console.log(final_str)
    return final_str 
  }    
  upgradeNftHandler = async () => {
    
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.getNFT_stars(this.state.boost_value).then(result => {
          alert("CurrentStars: "+result)
        })
        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  upgradeNftButton = () => {
    return (
    <div id="form_overlay" className='shadow sm:rounded-lg'>
        <form onSubmit={this.upgradeNftHandler}>
        <div>
          <label id="unlock">Token ID to upgrade   </label>
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
              BOOST ✪
            </span>
          </button>
        </div>
      </form>
    </div>
    )
  }
  componentDidMount = () => {
    //nft collection array
    this.collectionNftHandler()
    //TODO event to refresh when staked
  };


  render(){
    return (
        <div className='collection-page'>
            <h1 className="neon-title-app">NFT Galaxy</h1>

            <div >
              {this.upgradeNftButton()}
            </div>

            <div className="wrap">
        
            {this.state.collection_tokenImg.map(
                (item,i) => {
                return(
                    <div key={i}>
                      <div id="container" className="box">
                          <div id="block-name">
                          <div className="nft_name_title" >
                              {/*Name*/}
                              <a target = "_blank" 
rel = "noopener noreferrer" href={"https://testnets.opensea.io/assets/"+contractAddress+"/"+this.state.collection_tokenId[i]}>{this.state.collection_tokenName ? this.state.collection_tokenName[i] : ""}</a>
                              <p>{this.state.collection_tokenId[i]}*</p>
                            </div>
                          </div>
                          <div className="boxInner">
                            {/*Image*/}
                            <img alt={this.state.collection_tokenId[i]} className="image_nft" src={item} ></img>
                          </div>
                          <div className="middle">
                            {/*Stars*/}
                            <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Stars: {this.state.collection_tokenStars ? this.printStars(this.state.collection_tokenStars[i]) : ""}</div>
                            {/*Class*/}
                            <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Class: {this.state.collection_tokenClass ? this.state.collection_tokenClass[i] : ""}</div>
                            {/*Attributes*/}
                            <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Element: {this.state.collection_tokenElement ? this.state.collection_tokenElement[i] : ""}</div>
                            <div id="description" className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Attack: {this.state.collection_tokenAttack ? this.state.collection_tokenAttack[i] : ""}</div>
                            <p>-------</p>
                            {//staked
                            !this.state.collection_tokenStake[i] ? 
                            <button onClick={() => this.stake(this.state.collection_tokenId[i])} className='inline-flex px-2 text-xl font-semibold text-white-100 bg-red-500 rounded-full'> Stake </button>:
                            (<button onClick={() => this.unstake(this.state.collection_tokenId[i])} className='inline-flex px-2 text-xl font-semibold text-white-100 bg-purple-700 rounded-full' id="unstake">{this.state.collection_stakedTimeLeft[i] > 0 ? this.stakedTimeLeft(i):"Unstake"}</button>)
                            }     
                          </div>
                      </div>
                    </div>
                )
                })
            }
            </div>
        </div>
        )
    }
}

export default Collection