import React, { Component } from "react";
import {
  Navbar,
  Button,
  NavbarGroup,
  NavbarDivider,
  NavbarHeading,
  ProgressBar,
  Classes,
  Tag,
  Alignment
} from "@blueprintjs/core";
import { ToastContainer, toast } from "react-toastify";
import { ListContribution, ReviewContribution } from "../services/Contribution";

class Dashboard extends Component {
  state = { contributions: [], loading: true };

  routeTo(id) {
    this.props.history.push(id);
  }

  logout() {
    localStorage.removeItem("adminToken");
    window.location.assign("/login");
  }

  componentDidMount() {
    this.dataInit();
  }

  dataInit() {
    ListContribution("mongols")
      .then(data => {
        this.setState({ contributions: data.data, loading: false });
      })
      .catch(() => {
          toast(`Network Error`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          this.setState({ loading: false });
        });
  }

  acceptEdit(id) {
    ReviewContribution({ contribution_id: id, review: true, delete: false })
      .then(() => {
        this.dataInit();
      })
      .catch(() => {
        toast(`Network Error`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  }
  rejectEdit(id) {
    ReviewContribution({ contribution_id: id, review: false, delete: true })
      .then(() => {
        this.dataInit();
      })
      .catch(() => {
        toast(`Network Error`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  }

  render() {
    return (
      <div>
        <ToastContainer/>
        <Navbar fixedToTop={true}>
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
        <div style={{ maxWidth: "400px", margin: "auto", marginTop: "70px" }}>
          {this.state.loading && <ProgressBar />}

          {!this.state.loading && (
            <div>
              <h3>User Edits</h3>
              <hr />

              {this.state.contributions.length === 0 && (
                <p style={{ textAlign: "center" }}>No Pending User Edits</p>
              )}
              {this.state.contributions.map((d, k) => {
                return (
                  <div key={k}>
                    <div className="event-title">
                      <div className="flex-between">
                        <Tag>{d.year}</Tag>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <Button
                            rightIcon="cross"
                            onClick={() => this.rejectEdit(d._id["$oid"])}
                          >
                            Reject
                          </Button>
                          <Button
                            intent="primary"
                            rightIcon="tick"
                            onClick={() => this.acceptEdit(d._id["$oid"])}
                          >
                            Accept
                          </Button>
                        </div>
                      </div>

                      <h3 className="e-title">{d.title}</h3>
                    </div>
                    <p>{d.description}</p>
                    <div className="flex-between">
                      <Tag>{d.email}</Tag>
                      <Tag>{d.title_id}</Tag>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
