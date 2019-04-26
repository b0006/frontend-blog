import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AvatarPreview from './AvatarPreview';
import UserSettings from './UserSettings';

const CabinetPage = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="uk-width-1-1 uk-child-width-1-2 uk-margin" data-uk-grid>
      <UserSettings />
      <AvatarPreview />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    user
  };
};

export default connect(mapStateToProps)(CabinetPage);
