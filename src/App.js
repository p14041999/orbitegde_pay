import { Component } from "react";
// import { abi } from "./abi";
import "./App.css";
import btc from "./assets/btc.png";
import Web3 from "web3";
import arrow from "./assets/arrow.svg";
import edge from "./assets/edge.svg";
import TelegramIcon from "@material-ui/icons/Telegram";

class App extends Component {
  state = {
    isWalletConnected: false,
    balance: 0,
    oedgeBalance: 0,
    accountAddress: "",
    amount: 1,
  };

  async componentDidMount() {
    this.connectWallet = this.connectWallet.bind(this);
    this.sendBnb = this.sendBnb.bind(this);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      // this.contract = new window.web3.eth.Contract(
      //   abi,
      //   "0x4e169313319EaB6D986Dc351a20dF178902dCBAd"
      // );
    }
    window.ethaddress = "";
    this.connectWallet();
  }

  async connectWallet() {
    // let conn = await window.ethereum.enable();
    // this.state.isWalletConnected = conn.length > 0;
    // if (this.state.isWalletConnected) {
    //   this.state.accountAddress = conn[0];
    // }
    return true;
  }

  async sendBnb() {
    this.contract.methods
      .provideLiquidity()
      .send({
        from: this.state.accountAddress,
        value: window.web3.utils.toWei(this.state.amount),
      })
      .then((data) => {
        console.log(data);
      });
  }
  render() {
    return (
      <div className="app">
        <div className="card">
          <div className="header">
            <h4>Provide liquidity to ORBITEDGE</h4>
          </div>
          <div className="body">
            <div className="UpCont">
              <div className="upper-input">
                <div className="inputDiv">
                  <div class="maxCont">
                    <span>YOU WILL PAY</span>
                    <button>MAX</button>
                  </div>

                  <input
                    type="number"
                    value={this.state.amount}
                    onChange={(e) => {
                      if (e.target.value < 1) {
                        this.setState({ amount: 1 });
                      } else {
                        this.setState({ amount: e.target.value });
                      }
                    }}
                  />
                </div>
                <div className="des">
                  <img
                    style={{ height: 40, paddingLeft: 20, paddingRight: 20 }}
                    src={btc}
                  />
                  <h3>BNB</h3>
                </div>
              </div>
              <span className="bal">Balance: 1.234 BNB</span>
            </div>
            <div className="arrow">
              <img src={arrow} />
            </div>
            <div className="UpCont">
              <div className="upper-input">
                <div className="inputDiv">
                  <div class="maxCont">
                    <span>YOU WILL RECEIVE</span>
                    {/* <button>MAX</button> */}
                  </div>

                  <input
                    type="number"
                    value={this.state.amount}
                    onChange={(e) => {
                      if (e.target.value < 1) {
                        this.setState({ amount: 1 });
                      } else {
                        this.setState({ amount: e.target.value });
                      }
                    }}
                  />
                </div>
                <div className="des">
                  <img style={{ height: 40 }} src={edge} />
                  <h3>OEDGE</h3>
                </div>
              </div>
              <span className="bal">Balance: 0000 OEDGE</span>
            </div>
          </div>
          <div className="footer">
            {this.state.isWalletConnected && (
              <button className="Btn" onClick={this.sendBnb}>
                Provide Now
              </button>
            )}
            {!this.state.isWalletConnected && (
              <button className="Btn" onClick={this.connectWallet}>
                Connect Wallet
              </button>
            )}

            <button id="telegramBtn">
              <span>
                <TelegramIcon style={{ paddingRight: 20 }} />
              </span>
              Join our Telegram Group
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
