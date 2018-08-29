import React, { Component } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import {
  ZoomControl,
  RotationControl,
  Layer,
  Feature,
  Marker,
  Popup
} from "react-mapbox-gl";
import data from "./../data/mapdata.json";
import { events } from "../data/events.json";
import {
  H5,
  Slider,
  Card,
  Elevation,
  Tag,
  Button,
  Dialog,
  Classes,
  Tooltip,
  Intent
} from "@blueprintjs/core";
import config from "../config";
import { Scrollbars } from "react-custom-scrollbars";

const Map = ReactMapboxGl({
  accessToken: config.mapboxAPI
});

const legends = {
  mongols: {
    "fill-color": "rgba(200, 0, 0, 0.6)",
    "fill-opacity": 0.7
  },
  ikhanate: {
    "fill-color": "rgba(100, 0, 0, 0.6)",
    "fill-opacity": 0.7
  },
  "northern yuan": {
    "fill-color": "rgba(100, 250, 200, 0.6)",
    "fill-opacity": 0.7
  },
  "chagatai khanate": {
    "fill-color": "rgba(0, 200, 0, 0.6)",
    "fill-opacity": 0.7
  },
  "yuan dynasty": {
    "fill-color": "rgba(0, 100, 200, 0.6)",
    "fill-opacity": 0.7
  },
  "golden horde": {
    "fill-color": "rgba(0, 150, 100, 0.6)",
    "fill-opacity": 0.7
  }
};

class Mongols extends Component {
  state = {
    minYear: 0,
    maxYear: 0,
    zoomLevel: [2],
    year: 1195,
    data: data,
    events: events,
    center: [76, 30],
    mapPolygonData: [],
    innerHeight: window.innerHeight,
    mapMarkerData: [],
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: false,
    usePortal: true
  };

  componentDidMount() {
    this.dataInit();
  }

  dataInit() {
    let minyear = this.state.data.features.map(d => {
      return Math.min(...d.properties.year);
    });

    let maxyear = this.state.data.features.map(d => {
      return Math.max(...d.properties.year);
    });

    minyear = minyear.concat(
      this.state.events.map(d => {
        return d.year;
      })
    );

    maxyear = maxyear.concat(
      this.state.events.map(d => {
        return d.year;
      })
    );

    this.setState(
      {
        maxYear: Math.max(...maxyear),
        minYear: Math.min(...minyear),
        year: Math.min(...maxyear)
      },
      () => {
        this.filterDataByYear(this.state.minYear);
        this.plotMarker(this.state.minYear);
      }
    );
  }

  getChangeHandler(key, value) {
    let year = Math.round(value);
    this.filterDataByYear(year);
    this.plotMarker(year);
    this.setState({ center: [76, 30] });
    return this.setState({ [key]: year });
  }

  plotMarker(year) {
    let coords = this.state.events.filter(d => {
      if (d.year === year && d.plot.length > 0) {
        return true;
      }
    });
    this.setState({ mapMarkerData: coords }, () => {
      if (coords.length > 0) {
        this.setState({ center: coords[0].plot, zoomLevel: [2] });
      }
    });
  }

  onEventClick(year) {
    this.setState({ year: year });
    this.filterDataByYear(year);
    this.plotMarker(year);
  }

  renderLabel(val) {
    return `${Math.round(val)}`;
  }

  isFocus(year) {
    if (year === this.state.year) {
      return { background: "rgb(231, 231, 231)" };
    }
    return {};
  }

  filterDataByYear(year) {
    let dataByYear = this.state.data.features.filter(d => {
      if (d.properties.year.includes(year)) {
        return true;
      }
    });

    this.setState({ mapPolygonData: dataByYear });
  }

  render() {
    return (
      <div>
        <div className="title-container">
          <h3 className="centered-title">Rise and Fall of Mongols</h3>
        </div>
        <Map
          center={this.state.center}
          zoom={this.state.zoomLevel}
          ref={ref => (this.map = ref)}
          style="mapbox://styles/paraz/cjlett29m8kjr2rs0oybzsn10"
          containerStyle={{
            height: "100vh",
            width: "100vw",
            background: "#333"
          }}
        >
          <ZoomControl style={{ top: "50%" }} />
          <RotationControl style={{ top: "65%" }} />

          {this.state.mapPolygonData.map((d, k) => {
            return (
              <Layer
                type="fill"
                key={k}
                paint={legends[d["properties"]["empire"]]}
              >
                <Feature coordinates={d["geometry"]["coordinates"]} />
              </Layer>
            );
          })}

          {this.state.mapMarkerData.map((d, k) => {
            return (
              <div key={k}>
                <Marker coordinates={d.plot} anchor="bottom">
                  <img src={"https://i.imgur.com/MK4NUzI.png"} />
                </Marker>
                <Popup
                  coordinates={d.plot}
                  offset={{
                    "bottom-left": [12, -38],
                    bottom: [0, -20],
                    "bottom-right": [-12, -38]
                  }}
                >
                  <p>{d.title}</p>
                </Popup>
              </div>
            );
          })}
        </Map>

        <div className="map-hover bg-darken75 color-white">
          <H5 style={{ textAlign: "center", color: "white" }}>
            Year {this.state.year}
          </H5>
          <Slider
            min={this.state.minYear}
            max={this.state.maxYear}
            stepSize={0.1}
            className="centered-slider"
            labelStepSize={56}
            onChange={value => this.getChangeHandler("year", value)}
            value={this.state.year}
            labelRenderer={this.renderLabel}
            vertical={false}
          />
        </div>

        <div className="insights-card">
          <Scrollbars
            autoHeight
            autoHide
            autoHeightMin={window.innerHeight - 60}
          >
            <Card className="insights-card-item" elevation={Elevation.THREE}>
              <div className="event-head">
                <span style={{ fontSize: "18px" }}>Events</span>
                <Button
                  icon="add"
                  intent="primary"
                  onClick={() => {
                    this.setState({ isOpen: true });
                  }}
                  text="Add"
                />
              </div>
              <hr style={{ position: "relative", left: "10px" }} />
              {this.state.events.map((d, k) => {
                return (
                  <div
                    key={k}
                    className="event-item"
                    style={this.isFocus(d.year)}
                    onClick={() => this.onEventClick(d.year)}
                  >
                    <div className="event-title">
                      <div className="flex-between">
                        <Tag>{d.year}</Tag>
                        <span className="ut"> Edit</span>
                      </div>

                      <h3 className="e-title">{d.title}</h3>
                    </div>
                    <p>{d.description}</p>
                  </div>
                );
              })}
            </Card>
          </Scrollbars>
        </div>

        {this.state.mapPolygonData.length > 0 && (
          <div className="legends-card">
            <Card className="legend-items">
              {this.state.mapPolygonData.map((d, k) => {
                let empire = d["properties"]["empire"];
                return (
                  <div key={k} className="l-item">
                    <div
                      className="color-legend"
                      style={{ background: legends[empire]["fill-color"] }}
                    />
                    <p className="legend-title">{empire.toLocaleUpperCase()}</p>
                  </div>
                );
              })}
            </Card>
          </div>
        )}

        <Dialog
          icon="info-sign"
          onClose={this.handleClose}
          title=""
          {...this.state}
        >
          <div className={Classes.DIALOG_BODY}>
            <p>
              <strong>
                Data integration is the seminal problem of the digital age. For
                over ten years, we’ve helped the world’s premier organizations
                rise to the challenge.
              </strong>
            </p>
            <p>
              Palantir Foundry radically reimagines the way enterprises interact
              with data by amplifying and extending the power of data
              integration. With Foundry, anyone can source, fuse, and transform
              data into any shape they desire. Business analysts become data
              engineers — and leaders in their organization’s data revolution.
            </p>
            <p>
              Foundry’s back end includes a suite of best-in-class data
              integration capabilities: data provenance, git-style versioning
              semantics, granular access controls, branching, transformation
              authoring, and more. But these powers are not limited to the
              back-end IT shop.
            </p>
            <p>
              In Foundry, tables, applications, reports, presentations, and
              spreadsheets operate as data integrations in their own right.
              Access controls, transformation logic, and data quality flow from
              original data source to intermediate analysis to presentation in
              real time. Every end product created in Foundry becomes a new data
              source that other users can build upon. And the enterprise data
              foundation goes where the business drives it.
            </p>
            <p>
              Start the revolution. Unleash the power of data integration with
              Palantir Foundry.
            </p>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Tooltip content="Every contribution is reviewed before publishing.">
                <Button intent={Intent.PRIMARY} onClick={this.handleClose}>
                  Save
                </Button>
              </Tooltip>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Mongols;
