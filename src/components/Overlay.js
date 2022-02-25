import React from 'react'
import './../css/Overlay.css';
import { Component } from 'react/cjs/react.production.min';

class Overlay extends Component {
    decide_stack_used(item){
        switch (item){
            case 0:
                return ("ERC1155, Solidity, Ethers.js")
            case 1:
                return ("Defi, Solidity, Ethers.js")
            case 2:
                return ("Next.js, Tailwind.css, Typescript")
            case 3:
                return ("HTML, CSS, Javascript, Web3")
        }

    }
    render(){
        return (
        <div>
            Stack: {this.decide_stack_used(this.props.stack_item)}
        </div>
        )
    }
}

export default Overlay