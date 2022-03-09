import React from 'react'
import { Component } from 'react/cjs/react.production.min';
import "./../css/NavBar.css"
class NavBar extends Component {
    /*
    state = {
        likes: 0
    }
    
    addLikes = () => {
        let currentLikes = this.state.likes + 1
        this.setState({likes:currentLikes})
    }
    */
    render(){
        return (
            <ul className='stickyNav'>
                {/*
                <button className='likesButton' onClick={this.addLikes}>Like</button>
                <div className='likesDisplay'>{this.state.likes}</div>
                */}
                <div className='just-line'><br></br></div>
                <li id="contacts" className="navBarMenu"><a href="/contact" >Contact</a></li>
                <li className="navBarMenu"><a href="/resume">Resume</a></li>
                <li className="navBarMenu"><a href="/about" >About me</a></li>
                <li className="navBarMenu"><a href="/learn">Learn</a></li>
                <li className="navBarMenu"><a href="/">Home</a></li>
            </ul> 
        )
    }
}

export default NavBar