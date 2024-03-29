import React, { Component } from "react";
import { Dialog, Classes } from "@blueprintjs/core";
import { GoogleLogin } from "react-google-login";
import { GoogleAuth } from "./../services/Auth";
import { connect } from "react-redux";
import { actions } from "./../store";
import config from "./../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mapStateToProps = state => {
  return {
    isOpen: state.app.loginDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDialog: () => {
      dispatch(actions.app.toggle_login_dialog());
    },
    toggleContributionDialog: () => {
      dispatch(actions.app.toggle_contribution_dialog());
    },
    setUser: user => {
      dispatch(actions.user.set_email(user.email));
      dispatch(actions.user.set_name(user.name));
      dispatch(actions.user.set_pic(user.imageUrl));
      dispatch(actions.user.set_login(true));
    },
    setToken: token => {
      dispatch(actions.user.set_auth_token(token));
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

  googleLoginSuccess = e => {
    console.log(e);
    GoogleAuth(e.tokenId)
      .then(data => {
        this.props.setToken(data.data.token);
        this.props.setUser(e.profileObj);
        this.props.toggleDialog();
        localStorage.setItem("token", data.data.token);
        toast(`Logged in as ${e.profileObj.name}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        this.props.toggleContributionDialog();
      })
      .catch(() => {
        toast.error(`An error occurred`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  };

  googleLoginError = e => {
    console.log(e);
  };

  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <Dialog
          onClose={() => {
            this.props.toggleDialog();
          }}
          title="Login to Add or Edit Events"
          style={{ marginTop: "80px" }}
          isOpen={this.props.isOpen}
          {...this.state}
        >
          <div
            className={Classes.DIALOG_BODY}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <GoogleLogin
              clientId={config.googleClientId}
              onSuccess={this.googleLoginSuccess}
              onFailure={this.googleLoginError}
            >
              Sign In with Google
            </GoogleLogin>
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
