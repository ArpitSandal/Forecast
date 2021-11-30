import React from "react";
import reactDom from "react-dom";
import App from "./App";
import "../node_modules/leaflet/dist/leaflet.css";


function Index() {
  return (<App />);
}

reactDom.render(<Index />, document.getElementById("root"));
