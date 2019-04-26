import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../../../redux/actions';

import './SignIn.css';

const SignIn = ({ signIn, errorMsg }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [clientError, setClientError] = useState(null);

  const onChangeLogin = (event) => { setLogin(event.target.value); };
  const onChangePass = (event) => { setPassword(event.target.value); };

  const onSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(true);

    if (login.length <= 0) {
      setClientError('Login required');
      return false;
    }

    if (password.length <= 0) {
      setClientError('Password required');
      return false;
    }

    setClientError(null);

    signIn(login, password);
  };

  const errorServer = submitted && errorMsg
    ? errorMsg
    : null;

  return (
    <form className="auth_form" onSubmit={onSubmit}>

      <div className="uk-margin">
        <h2>Sign in</h2>
      </div>

      <div className="uk-margin">
        <div className="uk-inline">
          <span className="uk-form-icon" data-uk-icon="icon: user" />
          <input
            className="uk-input"
            type="text"
            onChange={onChangeLogin}
            placeholder="Login"
          />
        </div>
      </div>

      <div className="uk-margin">
        <div className="uk-inline">
          <span className="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock" />
          <input
            className="uk-input"
            type="password"
            onChange={onChangePass}
            placeholder="Password"
          />
        </div>
      </div>

      <div className="uk-margin error_block">
        <span className="error">
          {errorServer}
          {clientError}
        </span>
      </div>

      <div className="uk-margin">
        <input type="submit" className="uk-button uk-button-secondary" value="Sign in" />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  const { errorMsg, user } = state.authentication;
  return {
    errorMsg,
    user
  };
};

const mapDispatchToProps = {
  signIn: authActions.signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
