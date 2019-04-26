import { articleConstants } from '../../constants';

const initialState = {
  articleGetError: null,
  articleList: [],
  currentArticle: null,
  addArticleSuccess: null,
  deleteArticleSuccess: null
};

const article = (state = initialState, action) => {
  switch (action.type) {
  case articleConstants.ARTICLE_GETLIST_REQUEST:
    return state;
  case articleConstants.ARTICLE_GETLIST_SUCCESS:
    return {
      ...state,
      currentArticle: null,
      articleList: action.articleList,
      articleGetError: false
    };
  case articleConstants.ARTICLE_GETLIST_FAILURE:
    return {
      ...state,
      articleGetError: action.error
    };

  case articleConstants.ARTICLE_GET_REQUEST:
    return {
      ...state,
      currentArticle: null
    };
  case articleConstants.ARTICLE_GET_SUCCESS:
    return {
      ...state,
      currentArticle: action.article,
      articleGetError: false
    };
  case articleConstants.ARTICLE_GET_FAILURE:
    return {
      ...state,
      articleGetError: action.error
    };

  case articleConstants.ARTICLE_ADD_REQUEST:
    return {
      ...state,
      addArticleSuccess: null
    };
  case articleConstants.ARTICLE_ADD_SUCCESS:
    return {
      ...state,
      addArticleSuccess: true
    };
  case articleConstants.ARTICLE_ADD_FAILURE:
    return {
      ...state,
      addArticleSuccess: false
    };

  case articleConstants.ARTICLE_DELETE_REQUEST:
    return {
      ...state,
      deleteArticleSuccess: null
    };
  case articleConstants.ARTICLE_DELETE_SUCCESS:
    return {
      ...state,
      deleteArticleSuccess: true,
      articleList: action.articles
    };
  case articleConstants.ARTICLE_DELETE_FAILURE:
    return {
      ...state,
      deleteArticleSuccess: false
    };

  case articleConstants.ARTICLE_END_DELETE:
    return {
      ...state,
      deleteArticleSuccess: null
    };

  default:
    return state;
  }
};

export {
  article
};
