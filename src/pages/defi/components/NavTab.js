import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import "./../css/Defi.css"
import { Link } from 'react-router-dom';

class NavTab extends Component {
    
    componentDidMount = () => {
        
    };

    render() {
      return (
        <div >
            <div class="navtab">
                <a className="tablinks" id="swap"   href="/Defi/swap"> Swap </a>
                <a className="tablinks" id="pool"   href="/Defi/pool">Pool</a>
                <a className="tablinks" id="loan"   href="/Defi/loan">Loan</a>
                <a className="tablinks" id="vote"   href="/Defi/vote">Vote</a>
            </div>
        </div>

      );
    }
}

export default NavTab;
