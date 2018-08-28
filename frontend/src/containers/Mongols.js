import React, { Component } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { ZoomControl } from "react-mapbox-gl";
import data from "./../data/mapdata.json";
import { H5, Slider, Card, Elevation } from "@blueprintjs/core";
import config from "../config";

const Map = ReactMapboxGl({
  accessToken: config.mapboxAPI
});

class Mongols extends Component {
  state = {
    minYear: 0,
    maxYear: 0,
    year: 1195,
    data: data
  };

  componentDidMount() {
    this.dataInit();
    this.filterDataByYear(1365);
  }

  dataInit() {
    let minyear = this.state.data.features.map(d => {
      return Math.min(...d.properties.year);
    });

    let maxyear = this.state.data.features.map(d => {
      return Math.max(...d.properties.year);
    });
    this.setState({
      maxYear: Math.max(...maxyear),
      minYear: Math.min(...minyear)
    });
  }

  getChangeHandler(key) {
    return value => this.setState({ [key]: value });
  }

  renderLabel(val) {
    return `${Math.round(val)}`;
  }

  filterDataByYear(year) {
    let dataByYear = this.state.data.features.filter(d => {
      if (d.properties.year.includes(year)) {
        return true;
      }
    });
    return dataByYear;
  }

  render() {
    return (
      <div>
        <div className="title-container">
          <h3 className="centered-title">Rise and Fall of Mongols</h3>
        </div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
            background: "#333"
          }}
        />
        <ZoomControl style={{ marginTop: "80px" }} />
        <div className="map-hover bg-darken75 color-white">
          <H5 style={{ textAlign: "center", color: "white" }}>Year</H5>
          <Slider
            min={this.state.minYear}
            max={this.state.maxYear}
            stepSize={0.1}
            className="centered-slider"
            labelStepSize={10}
            onChange={this.getChangeHandler("year")}
            value={this.state.year}
            labelRenderer={this.renderLabel}
            vertical={false}
          />
        </div>

        <div className="insights-card">
          <Card className="insights-card-item" elevation={Elevation.THREE} />
        </div>
      </div>
    );
  }
}

export default Mongols;
