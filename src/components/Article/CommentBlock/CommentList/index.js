import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { commentActions } from '../../../../redux/actions';

import Spinner from '../../../../containers/Spinner';

import CommentItem from './CommentItem';

import './CommentList.css';

function hasChildren(tree) {
  return !!(tree.children && tree.children.length);
}

const Tree = ({ tree }) => {
  const renderTree = (item, key) => {
    return (
      <li key={`comment_item_${key}`}>
        <CommentItem
          authorName={item.authorName}
          authorId={item.authorId}
          authorLogin={item.authorLogin}
          authorAvatar={item.authorAvatar}
          content={item.content}
          date={item.date}
        />
        {hasChildren(item) && renderForest(item.children)}
      </li>);
  };

  const renderForest = (trees) => {
    return <ul className="uk-comment-list comment-liner">
      { trees.map(function (item) {
        return renderTree(item, item.id);
      })}</ul>;
  };

  return renderForest([tree], '');
}

const CommentList = ({ currentArticle, getList, commentList, commentListLoading }) => {
  useEffect(() => {
    getList(currentArticle.id);
  }, []);

  if (commentListLoading) {
    return <Spinner />;
  }

  return commentList.map(list => {
    return (
      <Tree key={`tree_${list.id}`} tree={list} />
    );
  });
};

const mapStateToProps = (state) => {
  const { commentList } = state.comment;
  const { currentArticle } = state.article;
  return {
    commentList,
    currentArticle
  };
};

const mapDispatchToProps = {
  getList: commentActions.getList
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
