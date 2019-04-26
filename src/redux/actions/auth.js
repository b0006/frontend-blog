import { AuthService } from '../services';
import { authConstants } from '../constants';

function signIn(login, password) {
  return dispatch => {
    dispatch(request({ login }));

    AuthService.signIn(login, password)
      .then(
        result => {
          dispatch(success(result.user));
        },
        err => {
          dispatch(failure(err));
        }
      );
  };

  function request(login) { return { type: authConstants.AUTH_SIGN_IN_REQUEST, login }; }
  function success(user) { return { type: authConstants.AUTH_SIGN_IN_SUCCESS, user }; }
  function failure(error) { return { type: authConstants.AUTH_SIGN_IN_FAILURE, error }; }
}

function signUp(login, email, password) {
  return dispatch => {
    dispatch(request({ login }));

    AuthService.signUp(login, email, password)
      .then(
        user => {
          dispatch(success(user));
        },
        err => {
          dispatch(failure(err));
        }
      );
  };

  function request(login) { return { type: authConstants.AUTH_SIGN_UP_REQUEST, login }; }
  function success() { return { type: authConstants.AUTH_SIGN_UP_SUCCESS }; }
  function failure(error) { return { type: authConstants.AUTH_SIGN_UP_FAILURE, error }; }
}

function logout() {
  return dispatch => {
    dispatch(request());

    AuthService.logout()
      .then(
        () => {
          dispatch(success());
        },
        err => {
          dispatch(failure(err));
        }
      );
  };

  function request() { return { type: authConstants.AUTH_LOGOUT_REQUEST }; }
  function success() { return { type: authConstants.AUTH_LOGOUT_SUCCESS }; }
  function failure(error) { return { type: authConstants.AUTH_LOGOUT_FAILURE, error }; }
}

export {
  signIn,
  signUp,
  logout
};
