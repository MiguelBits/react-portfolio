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
                <li className="navBarMenu"><a href="/resume">Resume</a></li>
                <li className="navBarMenu"><a href="/about" >About me</a></li>
                <li className="navBarMenu"><a href="/learn">Learn</a></li>
                <li className="navBarMenu"><a href="/">Home</a></li>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <li className="socialLinks"><a href="mailto:mcruzvas@gmail.com" target="_blank" className="fa fa-envelope"></a></li>
                <li className="socialLinks"><a href="https://github.com/mcruzvas" target="_blank" className="fa fa-github"></a></li>
                <li className="socialLinks"><a href="https://twitter.com/0xDealer_bits" target="_blank" className="fa fa-twitter"></a></li>
            </ul> 
        )
    }
}

export default NavBar