import React from 'react'
import './css/App.css';
import PortfolioApp from "./components/PortfolioApp"
import { Component } from 'react/cjs/react.production.min';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <div>
        <BrowserRouter>
          <Routes>
                <Route path="/" element={<PortfolioApp/>}/>
                <Route path="/nft_duel" element={<NFT_DApp/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App