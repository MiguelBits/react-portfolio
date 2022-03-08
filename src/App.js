import React from 'react'
import PortfolioApp from "./components/PortfolioApp"
import "./css/App.css"

import About from "./pages/navBar/pages/About"
import Resume from "./pages/navBar/pages/Resume"
import Learn from "./pages/navBar/pages/Learn"
import Contact from "./pages/navBar/pages/Contact"

import ConnectWallet from "./pages/nft_duel/components/ConnectWallet"
import Home from "./pages/nft_duel/pages/Home"
import Battle from "./pages/nft_duel/pages/Battle"
import Collection from "./pages/nft_duel/pages/Collection"

import { Component } from 'react/cjs/react.production.min';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
  }

  render(){
    return (
      <div className='main-App'>
        <BrowserRouter>
          <Routes>
                <Route path="/" element={<PortfolioApp/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/learn" element={<Learn/>}/>
                <Route path="/resume" element={<Resume/>}/>
                {/* NFT Duel   */}
                <Route path="/nftDuel" element={<ConnectWallet/>}/>
                <Route path="/nftDuel/home" element={<Home/>}/>
                <Route path="/nftDuel/battle" element={<Battle/>}/>
                <Route path="/nftDuel/collection" element={<Collection/>}/>
          </Routes>
        </BrowserRouter>
        
      </div>
    )
  }
}

export default App