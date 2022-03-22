import React from 'react'
import "./../css/Defi.css"
import NavTab from "./../components/NavTab"
import ShowBalance from '../components/ShowBalance'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import { AiOutlinePlusCircle,AiOutlineMinusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify'
import { ethers } from 'ethers';
import {routerAddress, routerABI, factoryAddress, factoryABI, WAVAX_Address, WETH_Address, USDC_Address, ERC20_ABI} from '../contracts/contract_abi';

class Defi extends React.Component {
  state = {
    useFunction: "",
    amountInput: 1,
    amountOutput: 0,
    switched: false,

    modalOpen: false,

    coinInput: " WETH",
    coinInput_img: "https://assets.coingecko.com/coins/images/17238/large/aWETH_2x.png?1626940782",

    coinOutput: " AVAX",
    coinOutput_img: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022",

    tokens: [" WETH"," AVAX"," USDC"],
    tokens_img: [
    "https://assets.coingecko.com/coins/images/17238/large/aWETH_2x.png?1626940782",
    "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022",
    "https://cryptologos.cc/logos/usd-coin-usdc-logo.png"],
    token1_amount: 0,
    token2_amount: 0,

    LPholdings: [],
    LP_pairsAddress: [],

    gasEstimate: 0,
    coinHolding: 0,
  }

  componentDidMount = () => {
    toast.configure()
    document.body.style.backgroundColor = "#504d4d"
    this.setState({useFunction:this.props.useFunction})
    if(this.props.useFunction === "Swap"){
      document.getElementById("swap").style.backgroundColor = "#504d4d"
      document.getElementById("swap").style.opacity = "100%"
    }
    else if(this.props.useFunction === "Pool"){
      document.getElementById("pool").style.backgroundColor = "#504d4d"
      document.getElementById("pool").style.opacity = "100%"
    }
    else if(this.props.useFunction === "Loan"){
      document.getElementById("loan").style.backgroundColor = "#504d4d"
      document.getElementById("loan").style.opacity = "100%"
    }
    else if(this.props.useFunction === "Vote"){
      document.getElementById("vote").style.backgroundColor = "#504d4d"
      document.getElementById("vote").style.opacity = "100%"
    }

    //click anywhere outside of ...
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    document.addEventListener("mousedown", this.handleClickOutside);

    this.getAmountsOutput(this.state.amountInput)
    this.getLPTokens()
    this.getGas()
    this.getMaxAmount()
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  getMaxAmount = async () => {
    const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.listAccounts();

        let address;

        if(this.state.coinInput === " AVAX"){
          await provider.getBalance(accounts[0]).then(balance => {
            this.setState({coinHolding:ethers.utils.formatEther(balance).slice(0,3)})
            return
          })
        }
        else if(this.state.coinInput === " WETH"){
          address = WETH_Address
        }
        else if(this.state.coinInput === " USDC"){
          address =  USDC_Address
        }

        const tokenContract = new ethers.Contract(address,ERC20_ABI,signer);
        tokenContract.balanceOf(accounts[0]).then(balance => {
          let int = ethers.utils.formatEther(parseInt(balance._hex.toString()).toString()).slice(0,6)
          this.setState({coinHolding:int})
        })

      }else{
        console.log("Ethereum object does not exist");
      }
  }
  clickMax = () => {
    this.setState({amountInput:this.state.coinHolding})
    this.getAmountsOutput(this.state.coinHolding)
  }
  getGas = async () => {
    const { ethereum } = window;
      if (ethereum) {
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const gasPrice = await provider.getGasPrice()
        this.setState({gasEstimate:parseFloat(parseInt(ethers.utils.parseEther(gasPrice.toString())._hex.toString()).toString().slice(0,3))})
      }else{
        console.log("Ethereum object does not exist");
      }

  }
  getLPTokens = async () =>{
    const { ethereum } = window;
      if (ethereum) {
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.listAccounts();

        const factoryContract = new ethers.Contract(factoryAddress, factoryABI, signer);
        factoryContract.allPairsLength().then(result=>{
          for(let i = 0; i < parseInt(result._hex.toString());i++){
            factoryContract.allPairs(i).then(address => {
              const previous_state= this.state.LP_pairsAddress;
              const updated_state = previous_state.concat(address)
              this.setState({LP_pairsAddress: updated_state})

              const LP_token = new ethers.Contract(address,ERC20_ABI,signer);
              LP_token.balanceOf(accounts[0]).then(balance =>{
                const previous_state_holding= this.state.LPholdings;
                const updated_state_holding = previous_state_holding.concat(parseFloat(parseInt(ethers.utils.parseEther(balance.toString())._hex.toString()).toString().slice(0,3)))
                this.setState({LPholdings: updated_state_holding})
              })
              
            })
          }
        })
      }else{
        console.log("Ethereum object does not exist");
      }
  }
  checkHoldings = async () => {
    document.getElementById("token_modal_holdings").style.display = "block";
    this.setState({modalOpen:true})

  }
  getAmountsOutput = async (value_e) =>{
    
    const { ethereum } = window;
    if (ethereum) {

      this.getMaxAmount()

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const routerContract = new ethers.Contract(routerAddress, routerABI, signer);

      const amountIn1 = ethers.utils.parseUnits(value_e.toString()).toString()
      //console.log(amountIn1)

      //AVAX -> WETH
      if(this.state.coinInput === " AVAX" && this.state.coinOutput === " WETH"){
        const tokens = [WAVAX_Address,WETH_Address]
        routerContract.getAmountsOut(amountIn1,tokens).then(result => {
          let int = ethers.utils.formatEther(parseInt(result[1]._hex.toString()).toString()).slice(0,6)
          this.setState({amountOutput:int})        })        
      }
      //WETH -> AVAX
      else if(this.state.coinInput === " WETH" && this.state.coinOutput === " AVAX" ){
        const tokens = [WETH_Address,WAVAX_Address]
        routerContract.getAmountsOut(amountIn1,tokens).then(result => {
          let int = ethers.utils.formatEther(parseInt(result[1]._hex.toString()).toString()).slice(0,6)
          this.setState({amountOutput:int})
        })   
      }
      //WETH -> USDC
      else if(this.state.coinInput === " WETH" && this.state.coinOutput === " USDC" ){
        const tokens = [WETH_Address,USDC_Address]
        routerContract.getAmountsOut(amountIn1,tokens).then(result => {
          let int = ethers.utils.formatEther(parseInt(result[1]._hex.toString()).toString()).slice(0,6)
          this.setState({amountOutput:int})        })   
      }
      //USDC -> WETH
      else if(this.state.coinInput === " USDC" && this.state.coinOutput === " WETH" ){
        const tokens = [USDC_Address,WETH_Address]
        routerContract.getAmountsOut(amountIn1,tokens).then(result => {
          let int = ethers.utils.formatEther(parseInt(result[1]._hex.toString()).toString()).slice(0,6)
          this.setState({amountOutput:int})        })   
      }
      //WAVAX -> USDC
      else if(this.state.coinInput === " AVAX" && this.state.coinOutput === " USDC" ){
        const tokens = [WAVAX_Address,USDC_Address]
        routerContract.getAmountsOut(amountIn1,tokens).then(result => {
          let int = ethers.utils.formatEther(parseInt(result[1]._hex.toString()).toString()).slice(0,6)
          this.setState({amountOutput:int})        })   
      }
      //USDC -> WAVAX
      else if(this.state.coinInput === " USDC" && this.state.coinOutput === " AVAX" ){
        const tokens = [USDC_Address,WAVAX_Address]
        routerContract.getAmountsOut(amountIn1,tokens).then(result => {
          let int = ethers.utils.formatEther(parseInt(result[1]._hex.toString()).toString()).slice(0,6)
          this.setState({amountOutput:int})        })   
      }
    }else{
      console.log("Ethereum object does not exist");
    }
  }
  switchAmounts = () => {
    this.setState({switched:!this.state.switched})
    let inAmount = this.state.amountInput
    let inCoin = this.state.coinInput
    let inCoinImg = this.state.coinInput_img

    this.setState({amountInput:this.state.amountOutput})
    this.setState({coinInput:this.state.coinOutput})
    this.setState({coinInput_img:this.state.coinOutput_img})

    this.setState({amountOutput:inAmount})
    this.setState({coinOutput:inCoin})
    this.setState({coinOutput_img:inCoinImg})

    this.getMaxAmount()

  }

  switchToken_Input = () => {
    document.getElementById("token_modal_input").style.display = "block";
    this.setState({modalOpen:true})
  }
  switchToken_Output = () => {
    document.getElementById("token_modal_output").style.display = "block";
    this.setState({modalOpen:true})
  }
  selectToken = (token) => {
    this.setState({selectToken:token})
  }
  closeModal = () => {
    document.getElementById("token_modal_input").style.display = "none";
    document.getElementById("token_modal_output").style.display = "none";
    document.getElementById("token_modal_holdings").style.display = "none";
    this.setState({modalOpen:false})
  }
  selectTokenInput(item,i){
    if(this.state.coinOutput === item){
      this.switchAmounts()
    }
    else{
      this.setState({coinInput:item})
      this.setState({coinInput_img:this.state.tokens_img[i]})
      this.closeModal()
      this.getMaxAmount()
    }
    
  }
  selectTokenOutput(item,i){
    if(this.state.coinInput === item){
      this.switchAmounts()
    }
    else{
      this.setState({coinOutput:item})
      this.setState({coinOutput_img:this.state.tokens_img[i]})
      this.closeModal()
      this.getMaxAmount()
    }
    
  }
  allConditionsForSwap(){
    if(this.state.useFunction === "Pool"){
      return true;
    }
    else if(this.state.amountInput !== 0 && this.state.amountOutput !== 0 && !this.state.switched){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Close Modal if clicked on outside of element
   */
   handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.modalOpen) {
      this.closeModal()
    }
  }

  AddLiquity = async (token1_amount) => {

      const { ethereum } = window;
      if (ethereum) {
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.listAccounts();

        const time = Math.floor(Date.now() / 1000) + 200000;
        const deadline = parseInt(ethers.BigNumber.from(time)._hex.toString()).toString();

        const routerContract = new ethers.Contract(routerAddress, routerABI, signer);

        const amountIn1 = ethers.utils.parseUnits(token1_amount.toString()).toString()
        this.getAmountsOutput(token1_amount)
        const amountIn2 = ethers.utils.parseUnits(this.state.amountOutput.toString()).toString()

        //console.log("amount1 "+amountIn1)
        //console.log("amount2 "+ amountIn2)

        //AVAX - WETH
        if((this.state.coinInput === " AVAX" && this.state.coinOutput === " WETH") || (this.state.coinInput === " WETH" && this.state.coinOutput === " AVAX" )){

          const token1 = new ethers.Contract(WETH_Address,ERC20_ABI,signer);
          token1.allowance(accounts[0],routerAddress).then(result => {
            //console.log("Result: "+result._hex.toString())
            if(result._hex === "0x00"){
              token1.approve(routerAddress,amountIn1)
            }
          })

          const amount1Min = amountIn1.slice(0,-1)
          const amount2Min = amountIn1.slice(0,-1)
          /*
          console.log(amountIn1)
          console.log(amount1Min)
          console.log(deadline)
          console.log(accounts[0])
          */
          try{
            await routerContract.addLiquidityETH(WETH_Address,
            amountIn1,amount1Min,amount2Min,
            accounts[0],deadline, 
            {value: amountIn1})
          }catch(e){
            if(e.code !== 4001){
              toast.error("Need to approve WETH tokens")
              let approve1 = await token1.approve(routerAddress,amountIn1)
              approve1.wait()
            }
            
          }

        }
        //AVAX -> USDC
        else if((this.state.coinInput === " AVAX" && this.state.coinOutput === " USDC") || (this.state.coinInput === " USDC" && this.state.coinOutput === " AVAX" )){

          const token1 = new ethers.Contract(USDC_Address,ERC20_ABI,signer);
          token1.allowance(accounts[0],routerAddress).then(result => {
            //console.log("Result: "+result._hex.toString())
            if(result._hex === "0x00"){
              token1.approve(routerAddress,amountIn1)
            }
          })

          const amount1Min = amountIn1.slice(0,-1)
          const amount2Min = amountIn2.toString().slice(0,-1)
          try{
            await routerContract.addLiquidityETH(USDC_Address,
            amountIn1,amount1Min,amount2Min,
            accounts[0],deadline, 
            {value: amountIn1})
          }catch(e){
            if(e.code !== 4001){
              toast.error("Need to approve USDC tokens")
              let approve1 = await token1.approve(routerAddress,amountIn1)
              approve1.wait()
            }
          }

        }
        //USDC - WETH
        else if((this.state.coinInput === " USDC" && this.state.coinOutput === " WETH")||(this.state.coinInput === " WETH" && this.state.coinOutput === " USDC" )){
          const token1 = new ethers.Contract(WETH_Address,ERC20_ABI,signer);

          token1.allowance(accounts[0],routerAddress).then(result => {
            //console.log("Result: "+result._hex.toString())
            if(result._hex === "0x00"){
              token1.approve(routerAddress,amountIn1)
            }
          })
          const token2 = new ethers.Contract(USDC_Address,ERC20_ABI,signer);
          token2.allowance(accounts[0],routerAddress).then(result => {
            //console.log("Result: "+result._hex.toString())
            if(result._hex === "0x00"){
              token2.approve(routerAddress,amountIn1)
            }
          })

          const amount1Min = amountIn1.slice(0,-1).toString()
          const amount2Min = amountIn2.toString().slice(0,-1).toString()
          try{
            await routerContract.addLiquidity(WETH_Address,USDC_Address,
              amountIn1,amountIn2,
              amount1Min,amount2Min,
              accounts[0],deadline)
          }catch(e){
            if(e.code !== 4001){
              toast.error("Need to approve your tokens")
              let approve1 = await token1.approve(routerAddress,amountIn1)
              approve1.wait()
              let approve2 = await token2.approve(routerAddress,amountIn1)
              approve2.wait()
            }
          }

        }
      }
      else{
        console.log("Ethereum object does not exist");
      }
  }
  RemoveLiquity = async (percent) => {
    const { ethereum } = window;
      if (ethereum) {
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.listAccounts();

        const time = Math.floor(Date.now() / 1000) + 200000;
        const deadline = parseInt(ethers.BigNumber.from(time)._hex.toString()).toString();

        const routerContract = new ethers.Contract(routerAddress, routerABI, signer);
        const factoryContract = new ethers.Contract(factoryAddress, factoryABI, signer);

        //AVAX -> WETH
        if((this.state.coinInput === " AVAX" && this.state.coinOutput === " WETH") || (this.state.coinInput === " WETH" && this.state.coinOutput === " AVAX" )){
  
          factoryContract.getPair(WAVAX_Address,WETH_Address).then(tokenAddress => {
            const pairContract = new ethers.Contract(tokenAddress,ERC20_ABI,signer)
            pairContract.balanceOf(accounts[0]).then(balance => {
              routerContract.removeLiquidityETH(tokenAddress,parseInt(balance._hex.toString()))
            })
            
          })
        }
        //AVAX -> USDC
        else if((this.state.coinInput === " AVAX" && this.state.coinOutput === " USDC") || (this.state.coinInput === " USDC" && this.state.coinOutput === " AVAX" )){
            
          factoryContract.getPair(WAVAX_Address,USDC_Address).then(tokenAddress => {
            const pairContract = new ethers.Contract(tokenAddress,ERC20_ABI,signer)
            pairContract.balanceOf(accounts[0]).then(balance => {
              routerContract.removeLiquidityETH(tokenAddress,parseInt(balance._hex.toString()))
            })
            
          })
        }
        //USDC - WETH
        else if((this.state.coinInput === " USDC" && this.state.coinOutput === " WETH")||(this.state.coinInput === " WETH" && this.state.coinOutput === " USDC" )){
            
          factoryContract.getPair(USDC_Address,WETH_Address).then(tokenAddress => {
            const pairContract = new ethers.Contract(tokenAddress,ERC20_ABI,signer)
            pairContract.balanceOf(accounts[0]).then(balance => {
              routerContract.removeLiquidityETH(tokenAddress,parseInt(balance._hex.toString()))
            })
            
          })
        }
      }
      else{
        console.log("Ethereum object does not exist");
      }
  }
  
  SwapTokens = async (token_amount) => {
  
      const { ethereum } = window;
      if (ethereum) {
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await provider.listAccounts();
        const signer = provider.getSigner();

        //time for deadline argument
        const time = Math.floor(Date.now() / 1000) + 200000;
        const deadline = ethers.BigNumber.from(time);

        //uniswap fork contract
        const routerContract = new ethers.Contract(routerAddress, routerABI, signer);
        //parse to Ether
        const amountIn = ethers.utils.parseEther(token_amount.toString());

        //AVAX -> WETH
        if(this.state.coinInput === " AVAX" && this.state.coinOutput === " WETH"){
          if(this.state.switched){
            const amountIn = parseInt(ethers.utils.parseUnits(token_amount.toString(),18)._hex.toString()).toString();
            const tokens = [WETH_Address,WAVAX_Address]
            
            //get amounts output
            const amountOut = await routerContract.callStatic.getAmountsOut(
              amountIn,
              tokens
            );
            //approve erc20
            const token1 = new ethers.Contract(WETH_Address,ERC20_ABI,signer);
            token1.allowance(accounts[0],routerAddress).then(result => {
              console.log("Result: "+result._hex.toString())
              if(result._hex === "0x00"){
                token1.approve(routerAddress,amountOut)
              }
            })
            
            //swap native coin for erc20
            await routerContract.swapExactTokensForETH(
              amountIn,
              amountOut[1],
              tokens,
              accounts[0],
              deadline
            );
          }
          else{
            const tokens = [WAVAX_Address,WETH_Address]

            //get amounts output
            const amountOut = await routerContract.callStatic.getAmountsOut(
              amountIn,
              tokens
            );
            
            //swap native coin for erc20
            await routerContract.swapExactETHForTokens(
              amountOut[1],
              tokens,
              accounts[0],
              deadline,
              { value: amountIn }
            );
          }
        }
        //WETH -> AVAX
        else if(this.state.coinOutput === " AVAX" && this.state.coinInput === " WETH"){
          
          if(this.state.switched){
            const tokens = [WAVAX_Address,WETH_Address]

            //get amounts output
            const amountOut = await routerContract.callStatic.getAmountsOut(
              amountIn,
              tokens
            );
            
            //swap native coin for erc20
            await routerContract.swapExactETHForTokens(
              amountOut[1],
              tokens,
              accounts[0],
              deadline,
              { value: amountIn }
            );
          }
          else{
            const amountIn = parseInt(ethers.utils.parseUnits(token_amount.toString(),18)._hex.toString()).toString();
            const tokens = [WETH_Address,WAVAX_Address]
            
            //get amounts output
            const amountOut = await routerContract.callStatic.getAmountsOut(
              amountIn,
              tokens
            );
            //approve erc20
            const token1 = new ethers.Contract(WETH_Address,ERC20_ABI,signer);
            token1.allowance(accounts[0],routerAddress).then(result => {
              console.log("Result: "+result._hex.toString())
              if(result._hex === "0x00"){
                token1.approve(routerAddress,amountOut)
              }
            })

            //swap native coin for erc20
            await routerContract.swapExactTokensForETH(
              amountIn,
              amountOut[1],
              tokens,
              accounts[0],
              deadline
            );
          }
          
        }

        // USDC -> WETH
        else if(this.state.coinInput === " USDC" && this.state.coinOutput === " WETH"){
          if(this.state.switched){
            const tokens = [WETH_Address,USDC_Address]
            const amountOut = await routerContract.callStatic.getAmountsOut(
              amountIn,
              tokens
            );

            //approve erc20
            const token1 = new ethers.Contract(WETH_Address,ERC20_ABI,signer);
            token1.allowance(accounts[0],routerAddress).then(result => {
              console.log("Result: "+result._hex.toString())
              if(result._hex === "0x00"){
                token1.approve(routerAddress,amountOut)
              }
            })

            await routerContract.swapExactTokensForTokens(
              amountIn,
              amountOut[1],
              tokens,
              accounts[0],
              deadline
            );
          }
          else{
            const tokens = [USDC_Address,WETH_Address]
            const amountOut = await routerContract.callStatic.getAmountsOut(
              amountIn,
              tokens
            );

            //approve erc20
            const token1 = new ethers.Contract(USDC_Address,ERC20_ABI,signer);
            token1.allowance(accounts[0],routerAddress).then(result => {
              //console.log("Result: "+result._hex.toString())
              if(result._hex === "0x00"){
                token1.approve(routerAddress,amountOut)
              }
            })
            
            await routerContract.swapExactTokensForTokens(
              amountIn,
              amountOut[1],
              tokens,
              accounts[0],
              deadline
            );
          }
        }
        // WETH -> USDC
        else if(this.state.coinInput === " WETH" && this.state.coinOutput === " USDC"){
          if(this.state.switched){
            const tokens = [USDC_Address,WETH_Address]
            const amountOut = await routerContract.callStatic.getAmountsOut(
              amountIn,
              tokens
            );

            //approve erc20
            const token1 = new ethers.Contract(USDC_Address,ERC20_ABI,signer);
            token1.allowance(accounts[0],routerAddress).then(result => {
              console.log("Result: "+result._hex.toString())
              if(result._hex === "0x00"){
                token1.approve(routerAddress,amountOut)
              }
            })

            await routerContract.swapExactTokensForTokens(
              amountIn,
              amountOut[1],
              tokens,
              accounts[0],
              deadline
            );
          }
          else{
            const tokens = [WETH_Address,USDC_Address]
            const amountOut = await routerContract.callStatic.getAmountsOut(
              amountIn,
              tokens
            );

            //approve erc20
            const token1 = new ethers.Contract(WETH_Address,ERC20_ABI,signer);
            token1.allowance(accounts[0],routerAddress).then(result => {
              console.log("Result: "+result._hex.toString())
              if(result._hex === "0x00"){
                token1.approve(routerAddress,amountOut)
              }
            })

            await routerContract.swapExactTokensForTokens(
              amountIn,
              amountOut[1],
              tokens,
              accounts[0],
              deadline
            );
          }
        }
        //await txnwait.wait()

      }else{
        console.log("Ethereum object does not exist");
      }
  }
  Loan = async () => {
    toast("Loan")
  }
  Swapper = () => {
    if(this.state.coinInput === this.state.coinOutput){
      toast.error("Cannot use the same tokens for transactions")
    }
    else{
      if(this.props.useFunction === "Swap"){
        this.SwapTokens(Number(this.state.amountInput))
      }
      else if(this.props.useFunction === "Pool"){
        if(!this.state.switched)this.AddLiquity(Number(this.state.amountInput),Number(this.state.amountOutput ))
        else this.RemoveLiquity(Number(this.state.amountInput),Number(this.state.amountOutput ))
      }
      else if(this.props.useFunction === "Loan"){
        this.Loan()
      }
      else if(this.props.useFunction === "Vote"){
        toast("Vote "+ Number(this.state.amountInput * 10**18) + " of " + this.state.coinInput)
        toast("In " + Number(this.state.amountOutput * 10**18) + " of " + this.state.coinOutput)
      }
    }
    
    
  }
  render() {
    return (
    <div className='DefiPage'>

      <NavTab></NavTab>

      <ShowBalance></ShowBalance>

      <div onClick={this.checkHoldings}>
        <img className="defi-logo" alt="logo" src="https://github.com/mcruzvas/react-portfolio/blob/master/public/image/bullfarm.png?raw=true"></img>
      </div>

      <div className='defi-name' onClick={()=>window.location.href='/Defi'}> Bull Farmer </div>

      <div className='container'>
        {/* SWAP BOX */}
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <div className='row-defi'>
            {this.props.useFunction === "Pool" ? 
            <button className='button_arrow_circle' onClick={() => this.setState({switched:!this.state.switched})}>
              {this.state.switched ? <AiOutlineMinusCircle className='fa_arrow_circle'></AiOutlineMinusCircle>:<AiOutlinePlusCircle className='fa_arrow_circle'></AiOutlinePlusCircle>}
            </button> 
            :
            <button className='button_arrow_circle' onClick={this.switchAmounts}>
              {this.state.switched ? <BsFillArrowUpCircleFill className='fa_arrow_circle'></BsFillArrowUpCircleFill>:<BsFillArrowDownCircleFill className='fa_arrow_circle'></BsFillArrowDownCircleFill>}
            </button>}
            
            <div className='col col-md-6 offset-md-3' id="window-defi">
                <h4 className='text-defi'>Defi</h4>
                <div id="form">
                    <div className="swapbox">
                                <div className="swapbox_select token_select" id="from_token_select" onClick={this.state.switched ? this.switchToken_Output : this.switchToken_Input}>
                                  <img className='token_select_img' alt="input-coin" src={this.state.coinInput_img}></img>
                                  {this.state.coinInput}
                                </div>
                                <div className="swapbox_select">
                                    <input className="number form-control" placeholder={this.state.amountInput}
                    onChange={(e) => this.getAmountsOutput(e.target.value)} id="from_amount"/>
                                    <div onClick={this.clickMax} className='max_holdings'>MAX: {this.state.coinHolding}</div>
                                </div>
                                
                    </div>
                    <div className='swapbox_arrow'><BsFillArrowDownCircleFill className='swapbox_arrow_circle'/></div>
                    <div className="swapbox">
                                <div className="swapbox_select token_select"  id="to_token_select" onClick={this.state.switched ? this.switchToken_Input : this.switchToken_Output}>
                                  {<img className='token_select_img' alt="output-coin" src={this.state.coinOutput_img}></img>}
                                  {this.state.coinOutput}
                                </div>
                                <div className="swapbox_select">
                                    <input className="number form-control" placeholder={this.state.amountOutput}
                     id="to_amount"/>
                                </div>
                    </div>
                    {/* SWAP BUTTON AND GAS */}
                    
                    <div>Estimated Gas:<span id="gas_estimate"> {this.state.gasEstimate}</span></div>
                    {this.allConditionsForSwap() ? <button className="btn btn-primary btn-block" onClick={this.Swapper} id="swap_button">
                        {this.state.useFunction}
                    </button> :
                    <button disabled className="btn btn-primary btn-block" onClick={this.Swapper} id="swap_button">
                        {this.state.useFunction}
                    </button>}
                </div>
                
              </div>
            </div>
          </div>
            {/* MODAL */}
            <div id="all-modals" ref={this.wrapperRef}>
              <div className="modal" id="token_modal_holdings" tabIndex="-1" role="dialog" >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Your token Holdings</h5>
                      <div type="button" className=" close-modal-defi" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                        <div id="modal_close">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                    <div className="modal-body">
                      <div id="modal_section">Liquidity :</div>
                      {this.state.LPholdings.map( (item,i) => {
                            return(
                              <div key={i} id="token_selection" className='token_row'>
                                <span className='token_list_text' >{item} ether of <br></br> {this.state.LP_pairsAddress[i]}</span>
                              </div>
                            )
                        } )}
                      <div id="modal_section">Collaterals :</div>
                      {this.state.LPholdings.map( (item,i) => {
                            return(
                              <div key={i} id="token_selection" className='token_row'>
                                <span className='token_list_text' >{item} ether of <br></br> {this.state.LP_pairsAddress[i]}</span>
                              </div>
                            )
                        } )}
                    </div>
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
                      <div id="token_list" >

                        {this.state.tokens.map( (item,i) => {
                            return(
                              <div key={i} id="token_selection" className='token_row' onClick={() => this.selectTokenInput(item,i) }>
                                <img alt={item} className='token_list_img' src={this.state.tokens_img[i]}/>
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
                              <div key={i} id="token_selection" className='token_row' onClick={() => this.selectTokenOutput(item,i) }>
                                <img alt={item} className='token_list_img' src={this.state.tokens_img[i]}/>
                                <span className='token_list_text' >{item}</span>
                              </div>
                            )
                        } )}
                      </div>
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