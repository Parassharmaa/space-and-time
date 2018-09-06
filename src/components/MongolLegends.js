import React, { PureComponent } from "react";
import { Card } from "@blueprintjs/core";
import { MongolLegendsData as legends } from "./LegendsData";

class MongolLegends extends PureComponent {
  render() {
    return (
      <div className="legends-card">
        <Card className="legend-items">
          {this.props.mapPolygonData.map((d, k) => {
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
    );
  }
}
export default MongolLegends;
