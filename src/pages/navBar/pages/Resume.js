import React from 'react'
import { Component } from 'react/cjs/react.production.min';
import NavBar from "./../../../components/NavBar"
import "./../css/Resume.css"

class Resume extends Component {

    render(){
        return (
            <div className='resume-page'>
                <div className='resume-main'>
                    <br></br>
                        <h1 className="cv-title">My Curriculum Vitae <br></br><br></br> 3 years of career,  and still counting</h1>
                        <div className="cv-body">
                            <ul className="cv-list">
                                <article className="experience" id="first_story">
                                    <div className="experience__number">00</div>
                                    <div className="experience__content">
                                    <div className="experience__title">NTT Data </div>
                                    <div className="experience__story" >
                                        <h2 className="company">Experience</h2>
                                        <p>First experience working as Developer</p>
                                        <p>This has been the most fascinating experience in my career, I realized that I could always be working better, continuously innovating and creating scripts to help my fellow team mates by automating their work, so they could perform to higher standards and with better tools.</p>
                                        <p>We as a team had to develop in a testing lab to attract new customers in the Banking area, we provided IoT systems with Voice/Facial Recognition to work in their stores.</p>
                                        <p>Cyber Security was introduced to me as well in this experience, as I developed software to ensure the Cisco Security Guidelines</p>
                                        <h3 className="company">Achievements:</h3>
                                        <ul>
                                            <li>Created IoT Recognition of customer system, able to turn all the lights and Televisions in the room and quizzing the customers, Know Your Customer types of questions;</li>
                                            <li>Increased network monitoring efficiency in REST API's;</li>
                                            <li>Implemented Windows security policies in the system to make our PC safe to use in customer environments with restrict security practices;</li>
                                        </ul>
                                        <p><h3 className="company">Stack:</h3></p>
                                        <p><h4>Programing Languages:</h4> Python, Java, Javascript, Powershell, Bash</p>
                                        <p><h4>Software:</h4> AWS, ElasticSearch, Windows Server, MongoDB</p>                                    </div>
                                    </div>
                                </article>
                                <article className="experience" id="second_story">
                                    <div className="experience__number">01</div>
                                    <div className="experience__content">
                                    <div className="experience__title">Altice</div>
                                    <div className="experience__story" >
                                    <h2 className="company">Experience</h2>
                                        <p>A Learning experience as production Software Developer </p>
                                        <p>Challenged my work methodologies, had to adhere to strict deployment of software strategies.</p>
                                        <p>As the youngest member of the crew, I learnt a lot with my older coworkers, namely producing excellent and secure software.</p>
                                        <p>Although short, this experience provided me with knowledge to develop software with very specific business models, ensuring that this software is continuously generating revenues.</p>
                                        <h3 className="company">Achievements:</h3>
                                        <ul>
                                            <li>Created advertisement platform for streaming services;</li>
                                            <li>Success in the full process of a software to production</li>
                                        </ul>
                                        <p><h3 className="company">Stack:</h3></p>
                                        <p>Python & NoSQL </p>
                                        </div>
                                    </div>
                                </article>
                                
                                <article className="experience" id="third_story">
                                    <div className="experience__number">02</div>
                                    <div className="experience__content">
                                    <div className="experience__title">Nokia</div>
                                    <div className="experience__story">
                                    <h2 className="company">Experience</h2>
                                        <p>Progressive Researching and Developing has always been my motivation.</p>
                                        <p>As I got more proficient in multiple programming languages, I managed to get comfortable working as a Fullstack Developer.</p>
                                        <p>Produced network monitoring tools, for the products REST API's, which awarded me and my team, the project of the year award.</p>
                                        <p>Distributed Systems implementation for Software As a Service, of the company products and software.</p>
                                        <p>Developing Object Oriented Programs with Design Patterns, namely Adapters, to extend our business areas.</p>
                                        <h3 className="company">Achievements:</h3>
                                        <ul>
                                            <li>I was able to prove my potential as a Fullstack Developer, to myself and my enterprise;</li>
                                            <li>Cloud deployment in Azure and Kubernetes, got comfortable using said tools;</li>
                                            <li>Experience with multiple programming languages and ability to shift languages quickly;</li>
                                        </ul>
                                        <p><h3 className="company">Stack:</h3></p>
                                        <p><h4>Programing Languages:</h4> Python, Java, C++</p>
                                        <p><h4 >Software:</h4> Azure, Grafana, Linux, Docker, Oracle Database</p>
                                        </div>
                                    </div>
                                </article>
                                <article className="experience" id="fourth_story">
                                    <div className="experience__number">03</div>
                                    <div className="experience__content">
                                        <div className="experience__title">Working for myself</div>
                                            <div className="experience__story">
                                                <h2 className="company">Experience</h2>
                                                <p>Projects that I did for fun and also for extra income.</p>
                                                <p>Developing Decentralized Applications for customers.</p>
                                                <p>As my interest for Blockchain grew, I started investing my developing skills in the Blockchain area.</p>
                                                <p>From Non-Fungible Tokens for Gaming to Collectibles, I develop Decentralized Application containing: minting functions, utilization of said NFTs, and deployment in main network.</p>
                                                <p>Studying more use cases in this recent technology, you can count me to always be on the vanguard of tech, always to be knowing more each day.</p>
                                                <p>Implementation of Ethereum Request for Comment 's, ERC20 ( Fungible Tokens ), ERC721 ( Non-Fungible Tokens ) and the two together in ERC1155. </p>
                                                <h3 className="company">Achievements:</h3>
                                                <ul>
                                                    <li>This Decentralized Application;</li>
                                                    <li>Self-taught blockchain knowledge in EVM compatible chains;</li>
                                                    <li>Experience with the full stack deployment of an application by myself;</li>
                                                </ul>
                                        <p><h3 className="company">Stack:</h3></p>
                                        <p><h4>Programing Languages:</h4> Solidity, Javascript, React, Next.js</p>
                                        <p><h4>Software:</h4> IPFS, Ethereum, Chainlink</p>
                                        </div>
                                    </div>
                                </article>
                            </ul>
                        </div>
                </div>
                
                <div className="navFooter"><NavBar></NavBar></div>
                
            </div>
        )
    }
}

export default Resume