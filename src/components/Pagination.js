import React from "react";

// for showing individual wheather
export default function Pagination(props) {
  // console.log(new Date(props.date).toDateString())
  let date = new Date(props.date).toDateString();
  let icon = "http://openweathermap.org/img/wn/" + props.icon + ".png";
  let description = props.description;

  return (
    <div className="pagination">
      <div>{date}</div>
      <div className="pagination-temperature">
        <img src={icon} alt={date}></img>
        <p>
          {parseInt(props.max_temp)} / {parseInt(props.min_temp)}
          <span>&#176;C</span>
        </p>
      </div>
      <div
        className="pagination-description"
        style={{ textTransform: "capitalize" }}
      >
        {description}
      </div>
    </div>
  );
}
