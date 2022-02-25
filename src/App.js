import React from 'react'
import './css/App.css';
import PortfolioApp from "./components/PortfolioApp"
import { Component } from 'react/cjs/react.production.min';

class App extends Component {
  render(){
    return (
      <div>
        <PortfolioApp/>
      </div>
    )
  }
}

export default App