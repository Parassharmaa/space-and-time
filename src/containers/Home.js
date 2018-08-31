import React, { Component } from "react";
import {
  Card,
  Elevation,
  Navbar,
  NavbarDivider,
  NavbarHeading,
  NavbarGroup,
  Alignment
} from "@blueprintjs/core";
import MagicString from "magic-string";

class Home extends Component {
  routeTo(id) {
    this.props.history.push(id);
  }

  render() {
    return (
      <div className="container">
        <div className="title-container">
          <h3 className="centered-title">Space N Time</h3>
        </div>
        <div className="flex-container" style={{ marginTop: "40px" }}>
          <Card
            onClick={() => this.routeTo("mongols")}
            interactive={true}
            className="flex-item gradient"
            elevation={Elevation.FOUR}
          >
            <h3>Rise and Fall of Mongols</h3>
          </Card>

          <Card className="flex-item freeze" elevation={Elevation.FOUR}>
            <h3>Coming Soon</h3>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
