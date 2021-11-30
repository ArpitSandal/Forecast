import React, { Component } from "react";
import Pagination from "./Pagination";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      did_we_got_data: false,
      key: "0b9ec749cf2e68b881a9a289abf65aec",
      weather_data: [],
      city: "",
      country: "",
      current_date: "",
      today_weather: {},
      current_page: 0,

    };
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  componentDidMount() {
    // fetching weather data
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        this.props.latitude +
        "&lon=" +
        this.props.longitude +
        "&units=metric&appid=" +
        this.state.key
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          weather_data: data.daily,
          today_weather: data.daily[0],
          current_date: new Date(data.current.dt * 1000).toDateString(),
          did_we_got_data: true,
        });
        // console.log(data);
      });

    // Getting city name using reverse geocode
    fetch(
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
        this.props.latitude +
        "&lon=" +
        this.props.longitude
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          city: data.address.city,
          country: data.address.country,
        });
        // console.log(data);
      });
  }

  setCurrentPage() {
    let current_page = this.state.current_page + 1;
    if (current_page  >=2) current_page = 0;
    // console.log(current_page);
    this.setState({ current_page: current_page });
  }

  render() {
    if (!this.state.did_we_got_data) return <h3 className="weather">Loading...</h3>;
    // console.log(this.state.today_weather.temp.day);
    let current_page = this.state.current_page;

    // Slicing data based on page no.
    let arr = this.state.weather_data.slice(
      current_page*3,
      Math.min(current_page*3 + 3, this.state.weather_data.length)
    );
    // console.log(arr);
    // Component array for sliced data, displaying weather of multiple days 
    let multiple_days_weather = arr.map((val, inx) => {
      return (
        <Pagination
          key={inx}
          date={val.dt * 1000}
          min_temp={val.temp.min}
          max_temp={val.temp.max}
          description={val.weather[0].description}
          icon={val.weather[0].icon}
        />
      );
    });

    return (
      <div className="weather">

        {/* Today weather block */}
        <div className="today-weather">
          <h4 className="current-date">{this.state.current_date}</h4>
          <h2 className="state-and-city">
            {this.state.city + ", " + this.state.country}
          </h2>

          {/* Today temperature */}
          <div className="today-temperature">
            {/* <div> */}
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  this.state.today_weather.weather[0].icon +
                  ".png"
                }
                alt="jai mata di"
              />
            {/* </div> */}
            <div>{parseInt(this.state.today_weather.temp.day)}
            <span>&#176;C</span></div>
          </div>
          {/* end today temperature block */}

          <button
            onClick={() => {
              this.setCurrentPage();
            }}
          >
            Next 3 Days Forecast
          </button>
        </div>

        {/* End Today weather block */}

        {multiple_days_weather}

      </div>
    );
  }
}
