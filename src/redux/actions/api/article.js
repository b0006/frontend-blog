import { ArticleService } from '../../services';
import { articleConstants } from '../../constants';

const articleStoreService = new ArticleService();

function getList() {
  return dispatch => {
    dispatch(request());

    articleStoreService.getList()
      .then(
        articleList => {
          dispatch(success(articleList));
        },
        err => {
          dispatch(failure(err.toString()));
        }
      );
  };

  function request() { return { type: articleConstants.ARTICLE_GETLIST_REQUEST }; }
  function success(articleList) { return { type: articleConstants.ARTICLE_GETLIST_SUCCESS, articleList }; }
  function failure(error) { return { type: articleConstants.ARTICLE_GETLIST_FAILURE, error }; }
}

function getArticleByValue(value) {
  return dispatch => {
    dispatch(request(value));

    articleStoreService.getArticleByValue(value)
      .then(
        article => {
          dispatch(success(article));
        },
        err => {
          dispatch(failure(err.toString()));
        }
      );
  };

  function request() { return { type: articleConstants.ARTICLE_GET_REQUEST }; }
  function success(article) { return { type: articleConstants.ARTICLE_GET_SUCCESS, article }; }
  function failure(error) { return { type: articleConstants.ARTICLE_GET_FAILURE, error }; }
}

function addArticle(title, content, mainImageBase64) {
  return dispatch => {
    dispatch(request(title));

    articleStoreService.addArticle(title, content, mainImageBase64)
      .then(
        () => {
          dispatch(success());
        },
        () => {
          dispatch(failure());
        }
      );
  };

  function request() { return { type: articleConstants.ARTICLE_ADD_REQUEST }; }
  function success() { return { type: articleConstants.ARTICLE_ADD_SUCCESS }; }
  function failure() { return { type: articleConstants.ARTICLE_ADD_FAILURE }; }
}

function deleteArticle(articleId) {
  return dispatch => {
    dispatch(request(articleId));

    articleStoreService.deleteArticle(articleId)
      .then(
        (newArticles) => {
          dispatch(success(newArticles));
        },
        (err) => {
          dispatch(failure(err));
        }
      );
  };

  function request() { return { type: articleConstants.ARTICLE_DELETE_REQUEST }; }
  function success(articles) { return { type: articleConstants.ARTICLE_DELETE_SUCCESS, articles }; }
  function failure(error) { return { type: articleConstants.ARTICLE_DELETE_FAILURE, error }; }
}

function endDelete() {
  return dispatch => {
    dispatch({
      type: articleConstants.ARTICLE_END_DELETE
    });
  };
}

export {
  getList,
  getArticleByValue,
  addArticle,
  deleteArticle,
  endDelete
};
