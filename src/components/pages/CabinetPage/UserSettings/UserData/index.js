import React from 'react';
import { connect } from 'react-redux';

const UserData = ({ user }) => {
  return (
    <div>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">User Data</legend>
        <div className="uk-margin">
          <span>Login: { user.login }</span>
        </div>
        <div className="uk-margin">
          <span>Email: { user.email }</span>
        </div>
      </fieldset>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  return {
    user
  };
};

export default connect(mapStateToProps)(UserData);
