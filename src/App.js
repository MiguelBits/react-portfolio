import React from 'react'
import './css/App.css';
import PortfolioApp from "./components/PortfolioApp"
import NavBar from "./components/NavBar"
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
        <NavBar></NavBar>
        <BrowserRouter>
          <Routes>
                <Route path="/" element={<PortfolioApp/>}/>
                {/* NFT Duel   */}
                <Route path="/nftDuel" element={<ConnectWallet/>}/>
                <Route path="/nftDuel/home" element={<Home/>}/>
                <Route path="/nftDuel/battle" element={<Battle/>}/>
                <Route path="/nftDuel/collection" element={<Collection/>}/>
          </Routes>
        </BrowserRouter>
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    )
  }
}

export default App