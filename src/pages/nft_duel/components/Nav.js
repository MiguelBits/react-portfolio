import React from 'react';
import "./../css/Duel.css"
import {FaHome} from "react-icons/fa"
import {FaGamepad} from "react-icons/fa"
import {FaAddressCard} from "react-icons/fa"
import {FaAccusoft} from "react-icons/fa"
import {FaAcquisitionsIncorporated} from "react-icons/fa"


class Nav extends React.Component {

    menuClose(){
      return (
        <div>
          <input type="checkbox" id="active"/>
            <label for="active" class="menu-btn"><span></span></label>
            <label for="active" class="close"></label>
            <div class="wrapper">
              <ul>
                <li>
                  <a href="/nftDuel/home">Home</a>
                  <FaHome/>
                </li>
                <li><a href="/nftDuel/battle">Battle</a>
                <FaGamepad/>
                </li>
                <li><a href="/nftDuel/collection">Collection</a>
                <FaAddressCard/>
                </li>
                <li><a href="https://testnets.opensea.io/collection/unidentified-contract-kwclm1cgyp" target="_blank">Gallery</a>
                <FaAccusoft/>
                </li>
                <li><a href="#">Feedback</a>
                <FaAcquisitionsIncorporated/>
                </li>
              </ul>
            </div>
        </div>
      )
    }

    render() {
      return (
        <div className='nav-side'>
          {this.menuClose()}
        </div>

      );
    }
}

export default Nav;
