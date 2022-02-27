import React from 'react';
import "./../css/Duel.css"
class Nav extends React.Component {

    render() {
      return (
        <nav id="navbar">
            <a href="/nftDuel/home">Home</a>
            <a href="/nftDuel/battle">Battle</a>
            <a href="/nftDuel/collection" >Collection</a>
        </nav> 

      );
    }
}

export default Nav;
