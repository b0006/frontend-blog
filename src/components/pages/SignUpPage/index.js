import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUp from './SignUp';

const LoginPage = ({ loggedIn }) => {
  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return <SignUp />;
};

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
};

export default connect(mapStateToProps)(LoginPage);
