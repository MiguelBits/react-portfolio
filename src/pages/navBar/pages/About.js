import React from 'react'
import { Component } from 'react/cjs/react.production.min';
import NavBar from "./../../../components/NavBar"
import './../css/About.css';
class About extends Component {

    render(){
        return (
            <div>
                <NavBar></NavBar>
                <div className='about-page'>
                        <div class="d1"></div>
                        <div class="d2"></div>
                        <div class="d3"></div>
                        <div class="d4"></div>
                </div>
            </div>
        )
    }
}

export default About