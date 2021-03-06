import React from 'react'
import PortfolioApp from "./components/PortfolioApp"
import "./css/App.css"
//Portfolio
import About from "./pages/navBar/pages/About"
import Resume from "./pages/navBar/pages/Resume"
import Learn from "./pages/navBar/pages/Learn"
//NFT
import ConnectWallet from "./pages/nft_duel/components/ConnectWallet"
import Home from "./pages/nft_duel/pages/Home"
import Battle from "./pages/nft_duel/pages/Battle"
import Collection from "./pages/nft_duel/pages/Collection"
//Defi
import Defi from "./pages/defi/pages/Defi"
import ConnectWallet_Defi from './pages/defi/components/ConnectWallet_Defi'
//components
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
                <Route path="/learn" element={<Learn/>}/>
                <Route path="/resume" element={<Resume/>}/>
                {/* NFT Duel   */}
                <Route path="/nftDuel" element={<ConnectWallet/>}/>
                <Route path="/nftDuel/home" element={<Home/>}/>
                <Route path="/nftDuel/battle" element={<Battle/>}/>
                <Route path="/nftDuel/collection" element={<Collection/>}/>
                {/* Defi pages  */}
                <Route path="/Defi" element={<ConnectWallet_Defi/>}/>
                <Route path="/Defi/home" element={<Defi useFunction="Swap"/>}/>
                <Route path="/Defi/swap" element={<Defi useFunction="Swap"/>}/>
                <Route path="/Defi/pool" element={<Defi useFunction="Pool"/>}/>
                <Route path="/Defi/loan" element={<Defi useFunction="Loan"/>}/>
                <Route path="/Defi/vote" element={<Defi useFunction="Vote"/>}/>
          </Routes>
        </BrowserRouter>
        
      </div>
    )
  }
}

export default App