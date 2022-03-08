import React from 'react'
import { Component } from 'react/cjs/react.production.min';
import NavBar from "./../../../components/NavBar"
import './../css/About.css';
class About extends Component {

    render(){
        return (
            <div className='about-page'>
                <div className='main-gallery'>
                        <div class="d1"></div>
                        <div class="d2"></div>
                        <div class="d3">
                            <div className="about-text"> 
                            The place is Lisbon, where I was born, raised, and where I studied Computer Science.
                            <br></br>
                            <br></br>
                            I spend my days coding, which is something I do for fun, as well for a living.
                            <br></br>
                            <br></br>
                            My purpose is to be as ambitious and innovative as my mind allows.
                            <br></br>
                            <br></br>
                            And let my creativity take control of my development.
                            <br></br>
                            <br></br>
                            I live a positive and mindful life, having very ambitious goals, and thus needing to perform to very high standarts everyday to accomplish them.
                            </div>
                        </div>
                        <div class="d4"></div>
                </div>
                <NavBar></NavBar>
            </div>
        )
    }
}

export default About