import React, { Component } from "react";
import {
  Card,
  Navbar,
  Button,
  NavbarGroup,
  NavbarDivider,
  NavbarHeading,
  InputGroup,
  Spinner,
  Classes,
  Alignment
} from "@blueprintjs/core";
import { ToastContainer, toast } from "react-toastify";

class Dashboard extends Component {
  state = {};

  routeTo(id) {
    this.props.history.push(id);
  }

  logout() {
    localStorage.removeItem("adminToken");
    window.location.assign("/login");
  }

  render() {
    return (
      <div>
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Dashboard</NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Button
              className={Classes.MINIMAL}
              icon="logout"
              onClick={() => this.routeTo("/")}
              text="Home"
            />
            <NavbarDivider />
            <Button
              className={Classes.MINIMAL}
              icon="logout"
              onClick={() => this.logout()}
              text="Logout"
            />
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}

export default Dashboard;
