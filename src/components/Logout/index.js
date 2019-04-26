import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions, headerActions } from '../../redux/actions';

const Logout = ({ logout, setActiveMenu }) => {
  useEffect(() => {
    logout();
    setActiveMenu('home');
  }, []);

  return <Redirect to="/" />;
};

const mapStateToProps = (state) => {
  const { loggedIn, errorMsg, user } = state.authentication;
  return {
    errorMsg,
    loggedIn,
    user
  };
};

const mapDispatchToProps = {
  logout: authActions.logout,
  setActiveMenu: headerActions.setActiveMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
