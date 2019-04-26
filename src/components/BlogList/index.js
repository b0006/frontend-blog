import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BlogPagination from './BlogPagination';
import AddArticle from '../../containers/AddArticle';
import { articleActions, modalActions } from '../../redux/actions';
import { apiBase } from '../../redux/constants';

import BlogItem from './BlogItem';

const BlogList = ({ getList, articleList, loggedIn, user }) => {
  useEffect(() => {
    getList();
  }, []);

  const newArticle = loggedIn && user.role === 1
    ? <AddArticle />
    : null;

  return (
    <div>
      <div className="uk-child-width-1-4@s uk-grid-match" data-uk-grid>
        {newArticle}
        {
          articleList.map(item => (
            <BlogItem
              key={`article_item_${item.id}`}
              id={item.id}
              value={item.value}
              title={item.title}
              img={apiBase + item.image}
              description={item.description}
              icon={null}
            />
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.authentication;
  const { articleGetError, articleList } = state.article;
  return {
    articleGetError,
    articleList,
    loggedIn,
    user
  };
};

const mapDispatchToProps = {
  getList: articleActions.getList,
  showModal: modalActions.showModal,
  hideModal: modalActions.hideModal,
  endDelete: articleActions.endDelete
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
