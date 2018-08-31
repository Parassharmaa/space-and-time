import React, { Component } from "react";
import {
  Button,
  Dialog,
  Classes,
  Tooltip,
  Intent,
  InputGroup,
  TextArea
} from "@blueprintjs/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { actions } from "./../store";
import { EditContribution } from "../services/Contribution";

const mapStateToProps = state => {
  return {
    isOpen: state.app.contributionDialog,
    editContribution: state.app.editContribution
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDialog: () => {
      dispatch(actions.app.toggle_contribution_dialog());
    }
  };
};

class AddContribution extends Component {
  state = {
    title: this.props.editContribution.title
  };

  componentDidMount() {
    console.log("yeh!!");
  }

  submitData() {
    if (this.state.title !== "") {
      EditContribution(this.state, "mongols")
        .then(() => {
          toast(`Submitted`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          this.props.toggleDialog();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleInputChange(key, event) {
    if (
      (key === "year" && event.target.value > 2018) ||
      event.target.value < 0
    ) {
      this.setState({ [key]: 2018 });
      toast(`Enter a valid year`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } else {
      this.setState({ [key]: event.target.value });
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.editContribution.title || "",
      year: props.editContribution.year || "",
      description: props.editContribution.description || "",
      plot: props.editContribution.plot || [],
      edit_id: props.editContribution._id["$oid"] || ""
    });
  }

  render() {
    return (
      <div>
        <Dialog
          onClose={() => {
            this.props.toggleDialog();
          }}
          title="Edit Event"
          style={{ marginTop: "80px" }}
          isOpen={this.props.isOpen}
          autoFocus={true}
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
          enforceFocus={true}
          usePortal={true}
        >
          <div className={Classes.DIALOG_BODY}>
            <div>
              <InputGroup
                id="title"
                value={this.state.title}
                placeholder="Title"
                onChange={event => this.handleInputChange("title", event)}
              />
              <br />
              <InputGroup
                fill={true}
                type={"number"}
                id="year"
                max={2018}
                value={this.state.year}
                placeholder="year"
                onChange={event => this.handleInputChange("year", event)}
              />
              <br />
              <TextArea
                id="description"
                fill={true}
                value={this.state.description}
                placeholder="Description"
                onChange={event => this.handleInputChange("description", event)}
              />
            </div>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Tooltip content="Every contribution is reviewed before it is published.">
                <Button
                  intent={Intent.PRIMARY}
                  onClick={() => this.submitData()}
                >
                  Done
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
)(AddContribution);
