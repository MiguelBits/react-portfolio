import React, { Component } from 'react'
import "./../css/Defi.css"
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'

export default class Defi extends Component {
  state = {
    amountInput: 0,
    amountOutput: 0,
  }


    
  render() {
    return (
      <div className='container'>
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
        <div className='row-defi'>
          <BsFillArrowDownCircleFill className='fa_arrow_circle'></BsFillArrowDownCircleFill>
            <div className='col col-md-6 offset-md-3' id="window-defi">
                <h4>Defi</h4>
                <div id="form">
                <div class="swapbox">
                            <div class="swapbox_select token_select" id="from_token_select">
                                <img class="token_image" id="from_token_img"/>
                                <span id="from_token_text"></span>
                            </div>
                            <div class="swapbox_select">
                                <input class="number form-control" value={this.state.amountInput}
                onChange={(e) => this.setState({amountInput: e.target.value})} id="from_amount"/>
                            </div>
                        </div>
                </div>
                <div className='swapbox_arrow'><BsFillArrowDownCircleFill className='swapbox_arrow_circle'/></div>
                <div class="swapbox">
                            <div class="swapbox_select token_select"  id="to_token_select">
                                <img class="token_image" id="to_token_img"/>
                                <span id="to_token_text"></span>
                            </div>
                            <div class="swapbox_select">
                                <input class="number form-control" value={this.state.amountOutput}
                onChange={(e) => this.setState({amountOutput: e.target.value})} id="to_amount"/>
                            </div>
                        </div>
                        <div>Estimated Gas: <span id="gas_estimate"></span></div>
                        <button disabled class="btn btn-large btn-primary btn-block" id="swap_button">
                            Swap
                        </button>
            </div>
            <div class="modal" id="token_modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Select token</h5>
                  <button id="modal_close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div id="token_list"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
