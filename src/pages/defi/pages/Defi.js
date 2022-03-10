import React from 'react'
import "./../css/Defi.css"
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import { toast } from 'react-toastify'

class Defi extends React.Component {
  state = {
    amountInput: 0,
    amountOutput: 1,
    switched: false,
    
    coinInput: "WETH",
    coinInput_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwbk5ebkGLZP-jhT83J2EOBTtL5U_4NIwL262gXWJNnNHCry7C1_A_URj_R7UxpltYqJ0&usqp=CAU",

    coinOutput: "Select Token",
    coinOutput_img: "https://cdn.pixabay.com/photo/2012/04/10/23/44/question-27106_1280.png",

    tokens: ["weth","avax","usdc"],
    tokens_img: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwbk5ebkGLZP-jhT83J2EOBTtL5U_4NIwL262gXWJNnNHCry7C1_A_URj_R7UxpltYqJ0&usqp=CAU",
    "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022",
    "https://cryptologos.cc/logos/usd-coin-usdc-logo.png"],

  }
  
  switchAmounts = () => {
    this.setState({switched:!this.state.switched})
  }

  switchToken_Input = () => {
    document.getElementById("token_modal_input").style.display = "block";
  }
  switchToken_Output = () => {
    document.getElementById("token_modal_output").style.display = "block";
  }
  selectToken = (token) => {
    this.setState({selectToken:token})
  }
  closeModal = () => {
    document.getElementById("token_modal_input").style.display = "none";
    document.getElementById("token_modal_output").style.display = "none";
  }
  selectTokenInput(item,i){
    this.setState({coinInput:item})
    this.setState({coinInput_img:this.state.tokens_img[i]})
  }
  selectTokenOutput(item,i){
    this.setState({coinOutput:item})
    this.setState({coinOutput_img:this.state.tokens_img[i]})
  }
  componentDidMount = () => {
    toast.configure()
    document.body.style.backgroundColor = "#504d4d"
  }
  render() {
    return (
      <div className='container'>
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <div className='row-defi'>
            <button className='button_arrow_circle' onClick={this.switchAmounts}>
              {this.state.switched ? <BsFillArrowUpCircleFill className='fa_arrow_circle'></BsFillArrowUpCircleFill>:<BsFillArrowDownCircleFill className='fa_arrow_circle'></BsFillArrowDownCircleFill>}
            </button>
            <div className='col col-md-6 offset-md-3' id="window-defi">
                <h4 className='text-defi'>Defi</h4>
                <div id="form">
                    <div className="swapbox">
                                <div className="swapbox_select token_select" id="from_token_select" onClick={this.state.switched ? this.switchToken_Output : this.switchToken_Input}>
                                {this.state.switched ? this.state.coinOutput:this.state.coinInput}
                                {this.state.switched ? <image alt="output-coin" src={this.state.coinOutput_img}></image>:<image alt="input-coin" src={this.state.coinInput_img}></image>}
                                    <img className="token_image" id="from_token_img"/>
                                    <span id="from_token_text"></span>
                                </div>
                                <div className="swapbox_select">
                                    <input className="number form-control" value={this.state.switched ? this.state.amountOutput : this.state.amountInput}
                    onChange={(e) => this.setState({amountInput: e.target.value})} id="from_amount"/>
                                </div>
                    </div>
                    <div className='swapbox_arrow'><BsFillArrowDownCircleFill className='swapbox_arrow_circle'/></div>
                    <div className="swapbox">
                                <div className="swapbox_select token_select"  id="to_token_select" onClick={this.state.switched ? this.switchToken_Input : this.switchToken_Output}>
                                  {this.state.switched ? this.state.coinInput:this.state.coinOutput}
                                  {this.state.switched ? <image alt="input-coin" src={this.state.coinInput_img}></image>:<image alt="output-coin" src={this.state.coinOutput_img}></image>}
                                    <img className="token_image" id="to_token_img"/>
                                    <span id="to_token_text"></span>
                                </div>
                                <div className="swapbox_select">
                                    <input className="number form-control" value={this.state.switched ? this.state.amountInput : this.state.amountOutput}
                    onChange={(e) => this.setState({amountOutput: e.target.value})} id="to_amount"/>
                                </div>
                    </div>
                    <div>Estimated Gas: <span id="gas_estimate"></span></div>
                    <button disabled className="btn btn-primary btn-block" id="swap_button">
                        Swap
                    </button>
                </div>
                
              </div>
            </div>
            <div className="modal" id="token_modal_input" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Select a token</h5>
                    <div type="button" className=" close-modal-defi" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                      <div id="modal_close">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div id="token_list">

                      {this.state.tokens.map( (item,i) => {
                          return(
                            <div key={i} id="token_selection" className='token_row' onClick={() => this.selectTokenInput(item,i) }>
                              <image alt={item} className='token_list_img' src={this.state.tokens_img[i]}/>
                              <span className='token_list_text' >{item}</span>
                            </div>
                          )
                      } )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal" id="token_modal_output" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Select a token</h5>
                    <div type="button" className=" close-modal-defi" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                      <div id="modal_close">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div id="token_list">

                      {this.state.tokens.map( (item,i) => {
                          return(
                            <div key={i} id="token_selection" className='token_row'>
                              <image alt={item} className='token_list_img' src={this.state.tokens_img[i]}/>
                              <span className='token_list_text' onClick={() => this.selectTokenOutput(item,i) }>{item}</span>
                            </div>
                          )
                      } )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default Defi;