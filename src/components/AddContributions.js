import React, { Component } from "react";
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

import { connect } from "react-redux";
import { actions } from "./../store";

const mapStateToProps = state => {
  return {
    isOpen: state.app.loginDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDialog: () => {
      dispatch(actions.app.toggle_login_dialog());
    }
  };
};

class LoginDialog extends Component {
  state = {
    mapMarkerData: [],
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    usePortal: true
  };

  render() {
    return (
      <div>
        <Dialog
          onClose={() => {
            this.props.toggleDialog();
          }}
          title=""
          style={{ marginTop: "80px" }}
          isOpen={this.props.isOpen}
          {...this.state}
        >
          <div className={Classes.DIALOG_BODY}>
            <p>
              <strong>Login with Google to Add Contributions</strong>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDialog);
