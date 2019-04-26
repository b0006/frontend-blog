import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignIn from './SignIn';

const LoginPage = ({ loggedIn }) => {
  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return <SignIn />;
};

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
};

export default connect(mapStateToProps)(LoginPage);
