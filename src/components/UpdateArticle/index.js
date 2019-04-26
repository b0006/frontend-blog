import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const UpdateArticle = ({ user }) => {
  if (user.role !== 1) {
    return <Redirect to="/" />;
  }

  return (
    <div>update</div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  return {
    user
  };
};

export default connect(mapStateToProps)(UpdateArticle);
