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
import { ProgressBar, Button } from "@blueprintjs/core";
import { ValidateUser } from "../services/Validate";
import LoginDialog from "../components/LoginDialog";
import config from "../config";
import { connect } from "react-redux";
import { actions } from "./../store";
import { MapEvents, MapPolygon } from "../services/MapData";
import Axios from "axios";
import ContributionDialog from "./../components/AddContributions";
import TimeSlider from "../components/TimeSlider";
import MongolLegends from "../components/MongolLegends";
import { MongolLegendsData as legends } from "../components/LegendsData";
import SideBar from "../components/SideBar";

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
    sideBarClose: true,
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
    localStorage.removeItem("token");
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
      return false;
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
      return false;
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

  getSideBarStatus() {
    if (this.state.sideBarClose) {
      return "side-bar-close";
    } else {
      return "side-bar-open";
    }
  }

  toggleSideBar() {
    this.setState({ sideBarClose: !this.state.sideBarClose });
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
                <h3 className="centered-title">
                  <Button
                    className="toggle-side-bar"
                    icon={"menu"}
                    onClick={() => this.toggleSideBar()}
                  />
                  Rise and Fall of Mongols
                </h3>
                {this.props.isLoggenIn && (
                  <Button
                    intent="primary"
                    className="logout-btn"
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
              style={"mapbox://styles/paraz/cjlett29m8kjr2rs0oybzsn10"}
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
                      <img
                        alt="marker"
                        src={"https://i.imgur.com/MK4NUzI.png"}
                      />
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

            <TimeSlider
              onChange={value => this.getChangeHandler("year", value)}
              labelRenderer={this.renderLabel}
              minYear={this.state.minYear}
              maxYear={this.state.maxYear}
              labelStepSize={56}
              year={this.state.year}
            />

            <SideBar
              getSideBarStatus={this.getSideBarStatus()}
              addEvent={() => this.addEvent()}
              editEvent={d => this.editEvent(d)}
              events={this.state.events}
              onEventClick={d => this.onEventClick(d)}
              isFocus={d => this.isFocus(d)}
            />

            {this.state.mapPolygonData.length > 0 && (
              <MongolLegends mapPolygonData={this.state.mapPolygonData} />
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
