import React from 'react'
import './../css/PortfolioApp.css';
import { Component } from 'react/cjs/react.production.min';

class PortfolioApp extends Component {
    state = {
        projects_collection: ["https://user-images.githubusercontent.com/15989933/153777731-e2be5a8a-18cb-46d7-889a-5375014f0c16.png",
        "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg",
        "https://media.istockphoto.com/photos/colorful-background-of-pastel-powder-explosionrainbow-color-dust-on-picture-id1180542165?k=20&m=1180542165&s=612x612&w=0&h=43hlhk8qdGYP4V-u3AAxD3kPDRIzHjMNWpr-VdBQ2Js=",
        "https://thumbs.dreamstime.com/b/d-image-abstract-tunnel-diagonal-black-white-stripes-optical-illusion-168695979.jpg"],
    
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