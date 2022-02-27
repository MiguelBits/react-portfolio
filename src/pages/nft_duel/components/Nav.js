import React from 'react';

class Nav extends React.Component {

    render() {
      return (
        <nav id="navbar">
            <a href="/home">Home</a>
            <a href="/battle">Battle</a>
            <a href="/collection" >Collection</a>
        </nav> 

      );
    }
}

export default Nav;
