import React from "react";
import { Component } from "react";

export default class Currency extends Component {
  key = "6427cb382433b4ddc0c8";
  constructor() {
    super();
    this.state = {
      inr_usd: 0,
      inr_eur: 0,
    };
  }

  // Getting exchange rates
  componentDidMount() {
    let api =
      "https://free.currconv.com/api/v7/convert?q=INR_USD,INR_EUR&compact=ultra&apiKey=" +
      this.key;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          inr_eur: data.INR_EUR,
          inr_usd: data.INR_USD,
        });
        // console.log(data);
      });
  }

  render() {
    return (
      <div className="currency">
        <div className="inner-currency">
          <ul className="currency-list">
            <li>Currency</li>
            <li>Price</li>
          </ul>
          <ul className="currency-list">
            <li>INR_USD</li>
            <li>{this.state.inr_usd}</li>
          </ul>
          <ul className="currency-list">
            <li>INR_EUR</li>
            <li>{this.state.inr_eur}</li>
          </ul>
        </div>
      </div>
    );
  }
}
