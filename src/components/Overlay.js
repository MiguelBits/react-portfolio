import React from 'react'
import './../css/Overlay.css';
import { Component } from 'react/cjs/react.production.min';

class Overlay extends Component {
    decide_stack_used(item){
        switch (item){
            case 0:
                return ("ERC1155, Solidity, Ethers.js, Web3")
            case 1:
                return ("Solidity, Defi, Ethers.js, Web3")
            case 2:
                return ("Next.js, Tailwind.css, Typescript")
            case 3:
                return ("NoSQL, Tailwind.css, Web3")
        }

    }
    conditionalCss(subject){
        switch (subject){
            case "Next.js":
                return "js"
            case "Defi":
                return "defi"
            case "database":
                return "db"
            case "Javascript":
                return "js"
            case "Web3":
                return "web3"
            case "Solidity":
                return "sol"
            case "ERC1155":
                return "nft"
            case "Tailwind.css":
                return "css"
            case "CSS":
                return "css"
            case "Ether.js":
                return "js"
            case "React":
                return "js"
            case "NFT":
                return "nft"
            case "NoSQL":
                return "nft"
            default:
                return "js"
        }
    }
    render(){
        return (
        <div className='stack'> 
            <div>
                <br></br>
                <div>
                    {this.decide_stack_used(this.props.stack_item).split(", ").map( (item,i) => {
                        return( 
                        <div key={i} className={this.conditionalCss(item)}>
                            {item}
                        </div>)
                    })}
                </div>
            </div>
        </div>
        )
    }
}

export default Overlay