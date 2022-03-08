import React from 'react'
import { Component } from 'react/cjs/react.production.min';
import "./../css/NavBar.css"
class NavBar extends Component {

    render(){
        return (
            <ul>
                <div className='just-line'><br></br></div>
                <li><a href="/contact" >Contact</a></li>
                <li><a href="/resume">Resume</a></li>
                <li><a href="/about" >About me</a></li>
                <li><a href="/learn">Learn</a></li>
            </ul> 
        )
    }
}

export default NavBar