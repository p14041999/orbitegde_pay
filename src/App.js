import { Component } from "react";
import { abi } from "./abi";
import "./App.css";
import btc from "./assets/btc.png";
import Web3 from "web3";
import QRCode from "qrcode.react";
import arrow from "./assets/arrow.svg";
import edge from "./assets/edge.svg";
import TelegramIcon from "@material-ui/icons/Telegram";
import FileCopyIcon from "@material-ui/icons/FileCopy";

class App extends Component {
  state = {
    isWalletConnected: false,
    balance: 0,
    oedgeBalance: 0,
    accountAddress: "",
    amount: 1,
    process: false,
  };

  async componentDidMount() {
    this.connectWallet = this.connectWallet.bind(this);
    this.sendBnb = this.sendBnb.bind(this);
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        abi,
        "0x09e1d08381d429202d81e63dd9e3bd28e015285a"
      );
    }
    window.ethaddress = "";
    this.connectWallet();
    setInterval(() => {
      this.fetchBalance();
    }, 1000);
  }

  async connectWallet() {
    let conn = await window.ethereum.enable();
    // this.state.isWalletConnected = conn.length > 0;
    this.setState({ isWalletConnected: conn.length > 0 });

    if (this.state.isWalletConnected) {
      // this.state.accountAddress = conn[0];
      this.setState({ accountAddress: conn[0] });
      this.fetchBalance();
    }
    console.log(this.state.balance);
    return true;
  }

  async fetchBalance() {
    let bnbBal = await this.web3.eth.getBalance(this.state.accountAddress);
    this.setState({ balance: bnbBal });
    let oBal = await this.contract.methods
      .balanceOf(this.state.accountAddress)
      .call();
    this.setState({ oedgeBalance: oBal });
  }

  async sendBnb() {
    // this.setState({ process: true });
    this.contract.methods
      .provideLiquidity()
      .send({
        from: this.state.accountAddress,
        value: this.web3.utils.toWei(this.state.amount.toString()),
        gas: 1850000,
      })
      .on("receipt", function (receipt) {
        // receipt example
        // this.setState({ process: false });
        console.log(receipt);
        // alert("Success");
        this.fetchBalance();
        return null;
      });
    // .on("error", function (error) {
    //   console.log(error);
    //   this.setState({ process: false });
    // });
  }

  handleCopyBtn = () => {
    navigator.clipboard.writeText("0x09e1d08381d429202d81e63dd9e3bd28e015285a");
    // alert(
    //   "Copied the Address: " + "0x4e169313319EaB6D986Dc351a20dF178902dCBAd"
    // );
  };
  handleMaxBtn = () => {
    let maxAmount = this.state.balance / 10e17;
    if (maxAmount >= 1) {
      this.setState({ amount: maxAmount });
    } else {
      alert("Amount should be greater than 1");
    }
  };

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
                    <button onClick={this.handleMaxBtn}>MAX</button>
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
              <span className="bal">
                Balance:{" "}
                {
                  /* {this.web3.utils.fromWei(this.state.balance.toString())}*/
                  this.state.balance / 10e17
                }{" "}
                BNB
              </span>
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
              <span className="bal">
                Balance: {this.state.oedgeBalance / 10e17} OEDGE
              </span>
            </div>
          </div>
          <div className="footer">
            {this.state.isWalletConnected && (
              <button className="Btn" onClick={this.sendBnb}>
                {this.state.process ? "Processing..." : "Provide Now"}
              </button>
            )}
            {!this.state.isWalletConnected && (
              <button className="Btn" onClick={this.connectWallet}>
                Connect Wallet
              </button>
            )}

            <a href="http://t.me/orbitedgefin" target="_blank"><button id="telegramBtn">
              <span>
                <TelegramIcon style={{ paddingRight: 20 }} />
              </span>
              Join our Telegram Channel
            </button></a>
          </div>
        </div>
        <div id="middleline">
          <h1 style={{ display: "none" }}>OR</h1>
        </div>
        <div className="qrcode">
          <h2>Scan QRCODE</h2>
          <QRCode
            size={200}
            value="0x09e1d08381d429202d81e63dd9e3bd28e015285a"
          />
          <div
            className="upper-input"
            id="UP"
            style={{ justifyContent: "space-between", width: "initial" }}
          >
            <div
              className="inputDiv"
              style={{ paddingLeft: 15, paddingRight: 15 }}
            >
              <div class="maxCont">
                <span>Address</span>
              </div>

              {/* <input
                type="number"
                value={this.state.amount}
                onChange={(e) => {
                  if (e.target.value < 1) {
                    this.setState({ amount: 1 });
                  } else {
                    this.setState({ amount: e.target.value });
                  }
                }}
              /> */}
              <p>0x09e1d08381.....e3bd28e015285a</p>
            </div>
            <button className="desBtn" onClick={this.handleCopyBtn}>
              <FileCopyIcon style={{ paddingRight: 15, paddingLeft: 15 }} />
              <h3>Copy</h3>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
