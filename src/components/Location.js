import React, { Component } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import loc from "../assets/loc.png";

class Location extends Component {
  icon = L.icon({
    iconUrl: loc,
    iconSize: [50, 50], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  });

  constructor() {
    super();
    this.state = {
      zoom: 15,
    };
  }

  render() {
    const position = [this.props.latitude, this.props.longitude];
    
    // Map getting rendered
    return (
      <div className="location">
        <MapContainer className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={this.icon}>
            <Popup>You are Here</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default Location;
