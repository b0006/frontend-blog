import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminItems from './AdminItems';

import { headerActions } from '../../redux/actions';

import './Header.css';

const Header = ({ setActiveMenu, loggedIn, activeMenu, user }) => {
  useEffect(() => {
    const pathLocation = window.location.pathname.split('/');
    if (pathLocation.length > 2) {
      setActiveMenu(pathLocation[pathLocation.length - 1]);
    } else {
      setActiveMenu('home');
    }
  }, []);

  const onChangeMenu = (activeMenuTitle) => {
    setActiveMenu(activeMenuTitle);
  };

  const logoutLink = loggedIn
    ? <li><Link to="/logout">Logout</Link></li>
    : null;

  const signIn = !loggedIn
    ? <li
      className={ activeMenu === 'signIn' ? 'active-menu' : null }
      onClick={() => { onChangeMenu('signIn'); }}><Link to="/signin">Sign in</Link></li>
    : null;

  const signUp = !loggedIn
    ? <li
      className={ activeMenu === 'signUp' ? 'active-menu' : null }
      onClick={() => { onChangeMenu('signUp'); }}><Link to="/signup">Sign up</Link></li>
    : null;

  const cabinet = loggedIn
    ? <li
      className={ activeMenu === 'cabinet' ? 'active-menu' : null }
      onClick={() => { onChangeMenu('cabinet'); }}><Link to="/cabinet">Cabinet</Link></li>
    : null;

  const adminItems = loggedIn && user.role === 1
    ? <AdminItems />
    : null;

  return (
    <nav className="uk-navbar-container" data-uk-navbar>
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className={ activeMenu === 'home' ? 'active-menu' : null }
            onClick={() => { onChangeMenu('home'); }}>
            <Link to='/'>Home</Link>
          </li>
          {signIn}
          {signUp}
          {adminItems}
          {cabinet}
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          {logoutLink}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.authentication;
  const { activeMenu } = state.header;
  return {
    loggedIn,
    activeMenu,
    user
  };
};

const mapDispatchToProps = {
  setActiveMenu: headerActions.setActiveMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
