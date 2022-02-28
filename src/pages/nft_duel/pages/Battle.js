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
    collection_tokenImg: [],
    collection_tokenName: [],
    collection_tokenClass: [],
    collection_tokenElement: [],
    collection_tokenAttack: [],
    collection_tokenStars: [],
    enemyId: 0,
    enemy_tokenImg: "",
    enemy_tokenName: "",
    enemy_tokenClass: "",
    enemy_tokenElement: "",
    enemy_tokenAttack: "",
    enemy_tokenStars: "",
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
            //console.log(result[i])
            const updated_state_nft_element = previous_state_element.concat(parseInt(result[i]._hex))
            this.setState({stakedIDs:updated_state_nft_element})
          }
        });
        

      }else{
        console.log("Ethereum object does not exist");
      }
  }
  getUriStakedTokens = async () => {
    const { ethereum } = window;
  
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

      let data = await nftContract.getStakedPopulation();

      for(let i = 0; i<=data.length;i++){
        nftContract.uri(data[i]).then(urlValue => {
          //console.log(urlValue)
          fetch(urlValue)
              .then(response => response.json())
              .then((jsonData) => {
                //update local storage listed by tokenId
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
        })})
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
      }
    }
    else {
      console.log("Ethereum object does not exist");
    }
    
  }
  componentDidMount = () => {
    this.getStakedPopulation();
    document.body.style.backgroundImage = 'url("https://wallpaperaccess.com/full/130220.jpg")';
    this.getUriStakedTokens();
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
  selectEnemy = async (enemy) => {
    const { ethereum } = window;
  
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

      nftContract.uri(enemy).then(urlValue => {
        //console.log(urlValue)
        fetch(urlValue)
            .then(response => response.json())
            .then((jsonData) => {
              //update local storage listed by tokenId
              //img
              this.setState({collection_tokenImg: jsonData.image})
              //name
              this.setState({collection_tokenName: jsonData.name})
              //class
              this.setState({collection_tokenClass: jsonData.properties.class})
              //element
              this.setState({collection_tokenElement: jsonData.properties.element})
      })})
      nftContract.getNFT_attack(enemy).then(result => {
        //attack
        this.setState({collection_tokenAttack: result._hex.toString()})
      })
      nftContract.getNFT_stars(enemy).then(result => {
        //stars
        this.setState({collection_tokenStars: result._hex.toString()})
      })
    }
    else {
      console.log("Ethereum object does not exist");
    }
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
                  <p>{this.state.openDropMenu ? 'Hide ❌' : 'Show ⭕️ '}</p>
                </div>
              </div>
              {this.state.openDropMenu && (
                <ul className="dd-list">
                  {this.state.stakedIDs.map((item,i) => (
                    <li className="dd-list-item" key={i}>
                      <link rel="preconnect" href="https://fonts.gstatic.com"/>
                      <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@700&display=swap" rel="stylesheet"/>
                      <a onClick={() => this.handleOnClick(item)} className="neon-button">{item}</a>
                      <img className='stakedHeroImg' alt={i} src={this.state.collection_tokenImg[i]}/>
                      <ul className='stakedHeroStats'>
                        <p>{this.state.collection_tokenName[i]}</p>
                        <p>Stars: {this.state.collection_tokenStars[i]}</p>
                        <p>Attack: {this.state.collection_tokenAttack[i]}</p>
                        <p>Class: {this.state.collection_tokenClass[i]}</p>
                        <p>Element: {this.state.collection_tokenElement[i]}</p>
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>


            <div className='EnemyHero'>
              <div className='p2-list'>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@700&display=swap" rel="stylesheet"/>
                <form onSubmit={this.selectEnemy}>
                  <div>
                      <label id="enemy-form">Enemy ID to Duel   </label>
                      <input
                        className='shadow sm:rounded-lg'
                        id='enemy-form_input'
                        value={this.state.boost_value}
                        onChange={(e) => this.setState({enemyId: e.target.value})}
                      />
                    <a onClick={() => this.selectEnemy(this.state.enemyId)} className="neon-button2">Select</a>
                  </div>
                </form>
                {this.state.enemyId != 0 ? <img className="enemyImg" src={this.state.enemy_tokenImg}/>:<img className="enemyImg" src="https://ms.yugipedia.com//thumb/f/fd/Back-Anime-ZX-2.png/261px-Back-Anime-ZX-2.png"/>}
              </div>
            </div>
          

        
      </div>
    );
  }
}

export default Battle;
