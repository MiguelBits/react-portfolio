import React from 'react'
import { Component } from 'react/cjs/react.production.min';
import "./../css/NavBar.css"
class NavBar extends Component {

    render(){
        return (
            <ul className='stickyNav'>
                <button className='changeThemeButton'>Change theme</button>
                <div className='just-line'><br></br></div>
                <li className="navBarMenu"><a href="/contact" >Contact</a></li>
                <li className="navBarMenu"><a href="/resume">Resume</a></li>
                <li className="navBarMenu"><a href="/about" >About me</a></li>
                <li className="navBarMenu"><a href="/learn">Learn</a></li>
                <li className="navBarMenu"><a href="/">Home</a></li>
            </ul> 
        )
    }
}

export default NavBar