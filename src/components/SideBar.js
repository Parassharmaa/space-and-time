import React, { PureComponent } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Card, Elevation, Tooltip, Button, Tag } from "@blueprintjs/core";
class SideBar extends PureComponent {
  render() {
    return (
      <div className={`insights-card ${this.props.getSideBarStatus}`}>
        <Scrollbars
          autoHeight
          autoHide
          className="sm-scroll-bar"
          autoHeightMin={window.innerHeight - 60}
        >
          <Card className="insights-card-item" elevation={Elevation.THREE}>
            <div className="event-head">
              <span style={{ fontSize: "18px" }}>Events</span>
              <span>
                <Tooltip content="Coming Soon!">
                  <Button
                    icon="add"
                    intent="primary"
                    onClick={() => this.props.addEvent()}
                    text="Add"
                  />
                </Tooltip>
              </span>
            </div>
            <hr
              className="sm-hr"
              style={{ position: "relative", left: "10px" }}
            />
            {this.props.events.map((d, k) => {
              return (
                <div
                  key={k}
                  className="event-item"
                  style={this.props.isFocus(d.year)}
                  onClick={() => this.props.onEventClick(d.year)}
                >
                  <div className="event-title">
                    <div className="flex-between">
                      <Tag>{d.year}</Tag>
                      <span
                        className="ut"
                        onClick={() => this.props.editEvent(d)}
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
    );
  }
}

export default SideBar;
