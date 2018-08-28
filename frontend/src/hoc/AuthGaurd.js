import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { apiUrl } from "../services/config";

export default Component => {
  class AuthenticatedComponent extends React.Component {
    state = {
      loggedIn: false
    };

    componentWillMount() {
      this.checkAuth();
    }

    checkPath(role) {
      return (
        role === this.props.location.pathname.replace("/", "").toUpperCase()
      );
    }

    checkAuth() {
      console.log(this.props);
      let token = localStorage.getItem("authToken");
      let role = localStorage.getItem("role");
      if (token && this.checkPath(role)) {
        axios({
          method: "get",
          url: `${apiUrl}/aee/validate`,
          headers: { Authorization: token }
        })
          .then(() => {
            this.setState({ loggedIn: true });
          })
          .catch(() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("role");
            this.props.history.push(`/`);
          });
      } else if (token && this.checkPath(role)) {
        axios({
          method: "get",
          url: `${apiUrl}/jee/validate`,
          headers: { Authorization: token }
        })
          .then(() => {
            this.setState({ loggedIn: true });
          })
          .catch(() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("role");
            this.props.history.push(`/`);
          });
      } else if (token && this.checkPath(role)) {
        axios({
          method: "get",
          url: `${apiUrl}/admin/validate`,
          headers: { Authorization: token }
        })
          .then(() => {
            this.setState({ loggedIn: true });
          })
          .catch(() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("role");
            this.props.history.push(`/`);
          });
      } else {
        this.props.history.push(`/`);
      }
    }

    render() {
      return <div>{this.state.loggedIn && <Component {...this.props} />}</div>;
    }
  }

  return withRouter(AuthenticatedComponent);
};
