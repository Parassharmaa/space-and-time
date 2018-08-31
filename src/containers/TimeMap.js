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
import {
  H5,
  Slider,
  Tooltip,
  Card,
  ProgressBar,
  Elevation,
  Tag,
  Button
} from "@blueprintjs/core";
import { ValidateUser } from "../services/Validate";
import LoginDialog from "../components/LoginDialog";
import config from "../config";
import { Scrollbars } from "react-custom-scrollbars";
import legends from "../components/MongolLegends";
import { connect } from "react-redux";
import { actions } from "./../store";
import { MapEvents, MapPolygon } from "../services/MapData";
import Axios from "axios";
import ContributionDialog from "./../components/AddContributions";

const Map = ReactMapboxGl({
  accessToken: config.mapboxAPI
});

const mapStateToProps = state => {
  return {
    appLoading: state.app.loading,
    isLoggenIn: state.user.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: payload => {
      dispatch(actions.app.set_loading(payload));
    },
    toggleLoginDialog: () => {
      dispatch(actions.app.toggle_login_dialog());
    },
    toggleContributionDialog: () => {
      dispatch(actions.app.toggle_contribution_dialog());
    },
    setEditContribution: payload => {
      dispatch(actions.app.set_edit_contribution(payload));
    },
    setLogin: payload => {
      dispatch(actions.user.set_login(payload));
    }
  };
};
class TimeMap extends Component {
  state = {
    minYear: 0,
    maxYear: 0,
    zoomLevel: [2],
    year: 1195,
    data: [],
    events: [],
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
    this.validateUser();
    this.props.setLoading(true);
    Axios.all([MapPolygon("mongols"), MapEvents("mongols")])
      .then(
        Axios.spread((r1, r2) => {
          this.setState(
            {
              data: r1.data[0],
              events: r2.data
            },
            () => {
              this.dataInit();
            }
          );
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  validateUser() {
    ValidateUser()
      .then(() => {
        this.props.setLogin(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  signOff() {
    this.props.setLogin(false);
    localStorage.removeItem('token');
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
        this.props.setLoading(false);
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

  editEvent(e) {
    this.props.setEditContribution(e);
    if (this.props.isLoggenIn) {
      this.props.toggleContributionDialog();
    } else {
      this.props.toggleLoginDialog();
    }
  }

  addEvent() {
    // this.props.setEditContribution({});
    // if (this.props.isLoggenIn) {
    //   this.props.toggleContributionDialog();
    // } else {
    //   this.props.toggleLoginDialog();
    // }
  }

  render() {
    return (
      <div>
        {this.props.appLoading && (
          <div className="progress-bar">
            <ProgressBar intent="primary" />
          </div>
        )}
        {!this.props.appLoading && (
          <div>
            <div className="title-container">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 className="centered-title">Rise and Fall of Mongols</h3>
                {this.props.isLoggenIn && (
                  <Button
                    intent="primary"
                    style={{ background: "#4264fb" }}
                    onClick={() => this.signOff()}
                    text="Logout"
                  />
                )}
              </div>
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
                <Card
                  className="insights-card-item"
                  elevation={Elevation.THREE}
                >
                  <div className="event-head">
                    <span style={{ fontSize: "18px" }}>Events</span>
                    <span>
                      <Tooltip content="Coming Soon!">
                        <Button
                          icon="add"
                          // disabled={true}
                          intent="primary"
                          onClick={() => this.addEvent()}
                          text="Add"
                        />
                      </Tooltip>
                    </span>
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
                            <span
                              className="ut"
                              onClick={() => this.editEvent(d)}
                            >
                              Edit
                            </span>
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
                        <p className="legend-title">
                          {empire.toLocaleUpperCase()}
                        </p>
                      </div>
                    );
                  })}
                </Card>
              </div>
            )}

            <LoginDialog />
            <ContributionDialog />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeMap);