import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { headerActions } from '../../../redux/actions';

const items = [
  {
    title: 'New articles',
    link: '/admin/newArticle',
    value: 'newArticle'
  },
  {
    title: 'Tags',
    link: '/admin/tags',
    value: 'tags'
  }
];

const AdminItems = ({ activeMenu, setActiveMenu }) => {
  const onChangeMenu = (activeMenuTitle) => { setActiveMenu(activeMenuTitle); };

  return (
    items.map(item => (
      <li
        key={item.value}
        className={ activeMenu === item.value ? 'active-menu' : null }
        onClick={() => { onChangeMenu(item.value); }}>
        <Link to={item.link}>{item.title}</Link>
      </li>
    ))
  );
};

const mapStateToProps = (state) => {
  const { activeMenu } = state.header;
  return {
    activeMenu
  };
};

const mapDispatchToProps = {
  setActiveMenu: headerActions.setActiveMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminItems);
