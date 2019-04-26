import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { articleActions } from '../../redux/actions';
import Preloader from '../../containers/Preloader';
import ArticleInner from '../../containers/ArticleInner';
import CommentBlock from './CommentBlock';

const Article = ({ currentArticle, getArticleByValue, match }) => {
  useEffect(() => {
    getArticleByValue(match.params.value);
  }, []);

  if (!currentArticle) {
    return <Preloader />;
  }

  return (
    <div>
      <ArticleInner
        title={currentArticle.title}
        text={currentArticle.text}
      />

      <hr/>

      <CommentBlock/>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { currentArticle } = state.article;
  return {
    currentArticle
  };
};

const mapDispatchToProps = {
  getArticleByValue: articleActions.getArticleByValue
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
