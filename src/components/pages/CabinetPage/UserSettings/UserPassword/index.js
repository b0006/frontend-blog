import React, { useState } from 'react';
import { connect } from 'react-redux';

import { modalActions } from '../../../../../redux/actions';

const UserPassword = () => {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(null);
  const [clientError, setClientError] = useState(null);

  const onChangeOldPassword = (event) => { setOldPassword(event.target.value); };
  const onChangeNewPassword = (event) => { setNewPassword(event.target.value); };
  const onChangeNewPasswordConfirm = (event) => { setNewPasswordConfirm(event.target.value); };

  const onSubmit = (event) => {
    event.preventDefault();
    const error = validationPassword(oldPassword, newPassword, newPasswordConfirm);
    if (error) {
      setClientError(error);
      return false;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">Change password</legend>
        <div className="uk-margin">
          <input
            className="uk-input"
            type="text"
            placeholder="Old password"
            maxLength="80"
            minLength="8"
            onChange={onChangeOldPassword}
          />
        </div>
        <div className="uk-margin">
          <input
            className="uk-input"
            type="text"
            placeholder="New password"
            maxLength="80"
            minLength="8"
            onChange={onChangeNewPassword}
          />
        </div>
        <div className="uk-margin">
          <input
            className="uk-input"
            type="text"
            placeholder="Confirm new password"
            maxLength="80"
            minLength="8"
            onChange={onChangeNewPasswordConfirm}
          />
        </div>

        <div className="uk-margin">
          <span>{ clientError }</span>
        </div>

        <div className="uk-margin">
          <input
            className="uk-button uk-button-primary"
            type="submit"
            value="Change"
          />
        </div>
      </fieldset>
    </form>
  );
};

const validationPassword = (oldPassword, newPassword, newPasswordConfirm) => {
  let error = null;

  if (oldPassword === null || oldPassword.length < 8) {
    error = 'Old password is short';
    return false;
  }

  if (newPassword === null || newPassword.length < 8) {
    error = 'New password is short';
    return false;
  }

  if (newPassword !== newPasswordConfirm) {
    error = 'Error confirm a new password';
    return false;
  }

  return error;
};

const mapDispatchToProps = {
  showModal: modalActions.showModal,
  hideModal: modalActions.hideModal
};

export default connect(null, mapDispatchToProps)(UserPassword);
