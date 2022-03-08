import React from 'react'
import './../css/PortfolioApp.css';
import './../css/Overlay.css';
import Overlay from './Overlay';
import { Component } from 'react/cjs/react.production.min';

class PortfolioApp extends Component {
    state = {
        projects_collection: ["https://github.com/mcruzvas/react-portfolio/blob/master/public/image/NFT.jpg?raw=trueg",
        "https://github.com/mcruzvas/react-portfolio/blob/master/public/image/Defi.jpg?raw=true",
        "https://github.com/mcruzvas/react-portfolio/blob/master/public/image/Frontend.jpg?raw=true",
        "https://github.com/mcruzvas/react-portfolio/blob/master/public/image/SocialMedia.jpg?raw=true"],
    
        projects_name: [
            "NFT", "Defi", "Frontend", "Social Media"
        ],

        projects_github:[
            "https://github.com/mcruzvas/nft_duel",
            "",
            "",
            ""
        ],
        projects_links:[
            "/nftDuel",
            "/Defi",
            "/FullStack",
            "/SocialMedia"
        ]
    }

    render(){
        return (
        <div className="row">
            {this.state.projects_collection.map(
                (item,i) => {
                    return(
                        <div className='container' key={i}>
                            <div>
                                <div>
                                    <p id="text">{this.state.projects_name[i]}</p>
                                </div>
                            </div>
                            <div className="column">
                                <img alt={i} className="image" src={item} ></img>
                            </div>
                            <div className="overlay">
                                <div className='overlay-text'>
                                    <div>   <Overlay stack_item={i} /></div>
                                    <div className='buttons_overlay'>
                                        <button id="viewcode">
                                            <a href={this.state.projects_github[i]} target="_blank">View Code</a>
                                        </button>
                                        <button id="gotoapp">
                                            <a href={this.state.projects_links[i]} target="_blank">Go to App</a>
                                        </button>
                                    </div>
                                </div> 
                            </div>
                        </div>
                )})}         
        </div>
        )
    }
}

export default PortfolioApp