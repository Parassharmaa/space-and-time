import React, { PureComponent } from "react";
import { Slider, H5 } from "@blueprintjs/core";

class TimeSlider extends PureComponent {
  render() {
    return (
      <div className="map-hover bg-darken75 color-white">
        <H5 style={{ textAlign: "center", color: "white" }}>
          Year {this.props.year}
        </H5>
        <Slider
          min={this.props.minYear}
          max={this.props.maxYear}
          stepSize={0.1}
          className="centered-slider"
          labelStepSize={56}
          onChange={value => this.props.onChange(value)}
          value={this.props.year}
          labelRenderer={this.props.labelRenderer}
          vertical={false}
        />
      </div>
    );
  }
}

export default TimeSlider;
