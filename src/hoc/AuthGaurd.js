import React from 'react';
import { withRouter } from 'react-router';
import { ValidateAdmin } from '../services/Validate';

export default (Component) => {

  class AuthenticatedComponent extends React.Component {
    state = {
      loggedIn: false
    }

    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      ValidateAdmin()
        .then(() => {
          this.setState({ loggedIn: true })
        })
        .catch(err => {
          this.props.history.push(`/login`);
          localStorage.removeItem('adminToken');
        })
    }

    render() {
      return (
        <div>
          {
            this.state.loggedIn && (
              <Component {...this.props} />
            )
          }
        </div>
      )
    }

  }

  return withRouter(AuthenticatedComponent);
}