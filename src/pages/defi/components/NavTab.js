import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import "./../css/Defi.css"

class NavTab extends Component {
    
    componentDidMount = () => {
        
    };

    render() {
      return (
        <div >
            <div class="navtab">
                <a class="tablinks" id="swap"   href="/Defi/swap"> Swap </a>
                <a class="tablinks" id="pool" href="/Defi/pool">Pool</a>
                <a class="tablinks" id="loan"   href="/Defi/loan">Loan</a>
                <a class="tablinks" id="vote"   href="/Defi/vote">Vote</a>
            </div>
        </div>

      );
    }
}

export default NavTab;
