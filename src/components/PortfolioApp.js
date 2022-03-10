import React from 'react'
import './../css/PortfolioApp.css';
import './../css/Overlay.css';
import Overlay from './Overlay';
import { Component } from 'react/cjs/react.production.min';
import NavBar from "./NavBar"

class PortfolioApp extends Component {
    state = {
        projects_collection: ["https://user-images.githubusercontent.com/15989933/156068528-9c3d45a9-64ab-479f-9e2b-fbe97fe089b2.png",
        "https://github.com/mcruzvas/react-portfolio/blob/master/public/image/Defi.jpg?raw=true",
        "https://github.com/mcruzvas/react-portfolio/blob/master/public/image/Frontend.jpg?raw=true",
        "https://github.com/mcruzvas/react-portfolio/blob/master/public/image/SocialMedia.jpg?raw=true"],
    
        projects_name: [
            "NFT", "Defi", "Frontend", "Social Media"
        ],

        projects_github:[
            "https://github.com/mcruzvas/erc1155",
            "https://github.com/mcruzvas/defi-in-solidity/tree/main",
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
            <div className='portfolio-App'>
                
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
                                        <img alt={item} className="imageProjects" src={item} ></img>
                                    </div>
                                    <div className="overlay">
                                        <div className='overlay-text'>
                                            <div>   <Overlay stack_item={i} /></div>
                                            <div className='buttons_overlay'>
                                                <button className="buttonStyled" id="viewcode">
                                                    <a className="button-link" href={this.state.projects_github[i]} target="_blank">View Code</a>
                                                </button>
                                                <button className="buttonStyled" id="gotoapp" >
                                                    <a className="button-link" href={this.state.projects_links[i]} target="_blank">Go to App</a>
                                                </button>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                        )})}       
                </div>
                <br></br>
                <br></br>
                <div className="description">
                    <h1 className="title-description"> Hello World </h1>
                    <div className="text-description"> This is my Decentralized React Application, hosted using IPFS. </div>
                    <br></br>
                    <div className="footer-description"> With Ethereum Name Service, I am able to provide you a unique experience navigating through of my Portfolio</div>
                    <br></br>
                    <div> Hover your mouse on the images to see more about each project. </div>
                    <br></br>
                    <div> Thank you ❤️ </div>
                </div>  
                <NavBar></NavBar>
        </div>
        )
    }
}

export default PortfolioApp