import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TagAdmin from './TagAdmin';

const TagAdminPage = ({ user }) => {
  if (user.role !== 1) {
    return <Redirect to="/" />;
  }
  return <TagAdmin />;
};

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    user
  };
};

export default connect(mapStateToProps)(TagAdminPage);
