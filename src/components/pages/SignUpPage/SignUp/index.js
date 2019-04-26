import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../../../redux/actions';

const SignUp = ({ signUp, signUpSuccess }) => {
  const [clientError, setClientError] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onChangeLogin = (event) => { setLogin(event.target.value); };
  const onChangePass = (event) => { setPassword(event.target.value); };
  const onChangeConfirmPass = (event) => { setConfirmPassword(event.target.value); };
  const onChangeEmail = (event) => { setEmail(event.target.value); };

  const onSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(true);

    if (login.length && email.length && password.length) {
      if (password !== confirmPassword) {
        setClientError('Confirm password error');
        return false;
      }

      setSubmitted(false);
      setClientError(null);

      signUp(login, email, password);
    } else {
      setClientError('All input fields must be filled');
    }
  };

  if (signUpSuccess) {
    return (
      <div>
        <span>To proceed with the registration, you need to read the message you just sent</span>
      </div>
    );
  }

  const errorClient = submitted && clientError
    ? clientError
    : null;

  return (
    <form className="auth_form" onSubmit={onSubmit}>

      <div className="uk-margin">
        <h2>Sign up</h2>
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
          <span className="uk-form-icon" data-uk-icon="icon: mail" />
          <input
            className="uk-input"
            type="email"
            onChange={onChangeEmail}
            placeholder="Email"
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

      <div className="uk-margin">
        <div className="uk-inline">
          <span className="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock" />
          <input
            className="uk-input"
            type="password"
            onChange={onChangeConfirmPass}
            placeholder="Confirm password"
          />
        </div>
      </div>

      <div className="uk-margin error_block">
        <span className="error">
          {errorClient}
        </span>
      </div>

      <div className="uk-margin">
        <input type="submit" className="uk-button uk-button-secondary" value="Sign up" />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  const { errorMsg, user, signUpSuccess } = state.authentication;
  return {
    errorMsg,
    user,
    signUpSuccess
  };
};

const mapDispatchToProps = {
  signUp: authActions.signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
