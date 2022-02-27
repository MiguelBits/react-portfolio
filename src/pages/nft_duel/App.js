import './css/App.css';

import { Component } from 'react/cjs/react.production.min';
import Nav from "./components/Nav"
import Battle from "./pages/Battle"
import Home from "./pages/Home"
import Collection from './pages/Collection';
import ConnectWallet from './components/ConnectWallet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


class NFT_DApp extends Component {

  componentDidMount = () => {
  };

  render(){
    return (
      <div >
        <BrowserRouter>
          <div className='main-app'>
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
              <Nav/>

              <Routes>
                <Route path="/" element={<ConnectWallet/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/battle" element={<Battle/>}/>
                <Route path="/collection" element={<Collection/>}/>
              </Routes>

          </div>
      </BrowserRouter>) 
      
      </div>
    )
  }
}

export default NFT_DApp;
