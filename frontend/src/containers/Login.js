import React, { Component } from "react";
import { Card, Button, InputGroup, Spinner } from "@blueprintjs/core";
import { ToastContainer, toast } from "react-toastify";
import { AdminAuth } from "../services/Auth";

class Login extends Component {
  state = {
    username: "",
    password: "",
    loading: false
  };

  routeTo(id) {
    this.props.history.push(id);
  }

  handleInputChange(key, event) {
    return this.setState({ [key]: event.target.value });
  }

  login() {
    if (this.state.username !== "" && this.state.password !== "") {
      this.setState({ loading: true });
      AdminAuth({
        username: this.state.username,
        password: this.state.password
      })
        .then(data => {
          console.log(data);
          localStorage.setItem("adminToken", data.data.token);
          this.routeTo("/dashboard");
        })
        .catch(err => {
          console.log(err);
          toast(`Invalid username or password`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true
          });
          this.setState({ loading: false });
        });
    } else {
      toast(`Please enter username and password`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true
      });
    }
  }

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="flex-container">
          <Card className="login-card">
            <h3 style={{ textAlign: "center" }}>Login</h3>

            <div>
              <InputGroup
                round={true}
                id="username"
                value={this.state.username}
                placeholder="Username"
                onChange={event => this.handleInputChange("username", event)}
              />
              <InputGroup
                type="password"
                round={true}
                value={this.state.password}
                id="password"
                placeholder="Password"
                onChange={event => this.handleInputChange("password", event)}
              />
              <div style={{ textAlign: "center" }}>
                <Button
                  intent="primary"
                  text="Login"
                  disabled={this.state.loading}
                  rightIcon={
                    this.state.loading && (
                      <Spinner
                        style={{
                          color: "#fff"
                        }}
                        size={15}
                        intent="warning"
                      />
                    )
                  }
                  onClick={() => this.login()}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
