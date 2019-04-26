import Cookies from 'js-cookie';
import { authConstants, apiBase } from '../constants';

export default class AuthService {
  static signIn = async (login, password) => {
    const rawResponse = await fetch(apiBase + '/login', {
      body: JSON.stringify({
        login: login,
        password: password
      }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const content = await rawResponse.json();

    if (content.status) {
      setCookie(content.session);
      return { user: content.session.user };
    } else {
      throw content.message;
    }
  };

  static signUp = async(login, email, password) => {
    const rawResponse = await fetch(apiBase + '/signup', {
      body: JSON.stringify({
        login: login,
        email: email,
        password: password
      }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
    const content = await rawResponse.json();

    if (content.status) {
      setCookie(content.session);
      return { user: content.session.user };
    } else {
      throw content.message;
    }
  };

  static logout = async () => {
    const rawResponse = await fetch(apiBase + '/logout', {
      method: 'GET'
    });
    const content = await rawResponse.json();
    if (content.status) {
      removeCookie();
      return true;
    } else {
      throw content;
    }
  };
}

const setCookie = (session) => {
  const oneHour = 3600000;
  const inOneHour = new Date(new Date().getTime() + oneHour);
  Cookies.set(authConstants.COOKIE_KEY, session, { expires: inOneHour });
};

const removeCookie = () => {
  Cookies.remove(authConstants.COOKIE_KEY);
};
