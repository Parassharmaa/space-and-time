import React, { Component } from "react";
import { Card, Elevation } from "@blueprintjs/core";

class Home extends Component {
  routeTo(id) {
    this.props.history.push(id);
  }

  render() {
    return (
      <div className="container">
        <div className="flex-container">
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
