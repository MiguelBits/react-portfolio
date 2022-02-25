import React from 'react'
import './../css/Overlay.css';
import { Component } from 'react/cjs/react.production.min';

class Overlay extends Component {
  render(){
    return (
      <div>
        Stack: {this.props.stack_item}!
      </div>
    )
  }
}

export default Overlay