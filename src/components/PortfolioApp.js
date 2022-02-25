import React from 'react'
import './../css/PortfolioApp.css';
import { Component } from 'react/cjs/react.production.min';

class PortfolioApp extends Component {
    state = {
        projects_collection: ["https://github.com/mcruzvas/react-portfolio/blob/master/public/image/NFT.jpg?raw=trueg",
        "https://github.com/mcruzvas/react-portfolio/blob/master/public/image/Defi.jpg?raw=true",
        "https://github.com/mcruzvas/react-portfolio/blob/master/public/image/Frontend.jpg?raw=true",
        "https://github.com/mcruzvas/react-portfolio/blob/master/public/image/SocialMedia.jpg?raw=true"],
    
        projects_name: [
            "NFT", "Defi", "Frontend", "Social Media"
        ]
    }

    render(){
        return (
        <div className="row">
            {this.state.projects_collection.map(
                (item,i) => {
                    return(
                        <div key={i}>
                            <div id="container">
                                <div id="block-name">
                                    <div className="box_title" >
                                        <p>{this.state.projects_name[i]}</p>
                                    </div>
                                </div>
                                <div className="column">
                                    <img alt={i} className="image_nft" src={item} ></img>
                                </div>
                                <div className="middle">
                                    <div> Hello </div> 
                                </div>
                            </div>
                        </div>
                )})}         
        </div>
        )
    }
}

export default PortfolioApp