import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import { Button } from '@material-ui/core';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm />

        <center>
          <Button
            type="button"
            className="btn_asLink"
            onClick={() => {
              this.props.history.push('/registration');
            }}
          >
            Register!
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
