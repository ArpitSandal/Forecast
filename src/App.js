import React, { Component } from "react";
import "./App.css";
import Currency from "./components/Currency";
import Location from "./components/Location";
import Weather from "./components/Weather";

class App extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  // Getting longitude and latitude position using navigator
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
        });
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }

  render() {
    if (this.state.latitude === 0) return <h2 style={{ textAlign: "center", color:"white"}}>Please Enable Location Services</h2>;

    return (
      <div className="my-container">
        <Weather
          latitude={this.state.latitude.toString()}
          longitude={this.state.longitude.toString()}
        />
        <div className="location-and-currency">
          <Location
            latitude={this.state.latitude}
            longitude={this.state.longitude}
          />
          <Currency />
        </div>
      </div>
    );
  }
}

export default App;
