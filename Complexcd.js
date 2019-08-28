import React, { Component } from "react";
import Chip from "./img/emv.jpg";
import Visa from "./img/Visa.jpg";
import Triangle from "./img/Triangle.svg";
import Background from "./img/bkg.jpg";

export default class Complexcd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CardName: "CREDIT CARD",
      nbrcard: "",
      valid: "",
      holder: ""
    };
  }

  renderCardNumber = e => {
    let RegEx = /[^0-9 ]/gi;
    if (e.target.value.length < 17 && !RegEx.test(e.target.value))
      this.setState({ nbrcard: e.target.value.replace(/[ ]/g, "") });
  };
  space = str => {
    let resultStr = "";
    for (let i = 0; i < str.length; i += 4) {
      resultStr += str.slice(i, i + 4) + " ";
    }
    return resultStr.trim();
  };
  validity = e => {
    let RegEx = /[^0-9]/gi;
    if (RegEx.test(e.target.value)) return;
    this.setState({ valid: e.target.value.replace(/[ ]/g, "").slice(0, 4) });
  };
  split = str => {
    return str.slice(0, 2) + "/" + str.slice(2);
  };
  maj = e => {
    let RegEx = /[^A-Za-z+$]/gi;
    if (RegEx.test(e.target.value)) return;
    {
      if (e.target.value.length <= 8)
        this.setState({
          holder: e.target.value.replace(/[ ]/g, "").toUpperCase()
        });
    }
  };
  render() {
    return (
      <div>
        <div className="App" style={{ backgroundImage: `url(${Background})` }}>
          <div className="credit-card-Title">
            <h1>{this.state.CardName}</h1>
          </div>
          <img className="credit-card-EMVShip" src={Chip} alt="emvShip" />

          <div className="crd-Content">
            <div>
              <div className="credit-card-Number">
                {this.space(this.state.nbrcard.toString().padEnd(16, "."))}
              </div>

              <div className="credit-card-Info">
                <div>5432</div>
                <div className="crd-ref">
                  <div className="crd-valid">
                    <div>VALID</div>
                    <div>THRU</div>
                  </div>
                  <div className="crd-valid">
                    <img src={Triangle} alt="icon" />
                  </div>
                  <div className="crd-crea">
                    <div>MONTH/YEAR</div>
                    <div className="crd-crea-time">
                      {this.split(this.state.valid.toString().padEnd(4, "."))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="credit-card-Holder">
                {this.state.holder.toString()}
              </div>
            </div>

            <img className="credit-card-Visa" src={Visa} alt="MasterCardVisa" />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder={"enter your nbr card"}
            onChange={e => this.renderCardNumber(e)}
          />
          <input
            type="text"
            placeholder={"enter the card validity "}
            onChange={e => this.validity(e)}
          />
          <input
            type="text"
            onChange={e => this.maj(e)}
            placeholder={"enter your name "}
          />
        </div>
      </div>
    );
  }
}
