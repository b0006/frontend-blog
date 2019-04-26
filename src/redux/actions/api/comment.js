import { commentConstants } from '../../constants';
import { CommentService } from '../../services';

const commentStoreService = new CommentService();

function changeParent(parentId, parentLogin) {
  return dispatch => {
    dispatch({
      type: commentConstants.COMMENT_CHANGE_PARENT,
      pid: parentId,
      parentLogin: parentLogin
    });
  };
}

function addComment(content, pid, articleId) {
  return dispatch => {
    dispatch(request());

    commentStoreService.addComment(content, pid, articleId)
      .then(
        () => {
          dispatch(success());
        },
        err => {
          dispatch(failure(err.toString()));
        }
      );
  };

  function request() { return { type: commentConstants.COMMENT_ADD_REQUEST }; }
  function success() { return { type: commentConstants.COMMENT_ADD_SUCCESS }; }
  function failure(error) { return { type: commentConstants.COMMENT_ADD_FAILURE, error }; }
}

function getList(articleId = null) {
  return dispatch => {
    dispatch(request(articleId));

    commentStoreService.getList(articleId)
      .then(
        (commentList) => {
          dispatch(success(commentList));
        },
        err => {
          dispatch(failure(err.toString()));
        }
      );
  };

  function request() { return { type: commentConstants.COMMENT_GETLIST_REQUEST }; }
  function success(commentList) { return { type: commentConstants.COMMENT_GETLIST_SUCCESS, commentList }; }
  function failure(error) { return { type: commentConstants.COMMENT_GETLIST_FAILURE, error }; }
}

export {
  changeParent,
  addComment,
  getList
};
