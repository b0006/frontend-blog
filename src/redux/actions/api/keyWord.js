import { KeyWordService } from '../../services';
import { keyWordConstants } from '../../constants';

const keyWordStoreService = new KeyWordService();

function getList() {
  return dispatch => {
    dispatch(request());

    keyWordStoreService.getList()
      .then(
        keyWordList => {
          dispatch(success(keyWordList));
        },
        err => {
          dispatch(failure(err.toString()));
        }
      );
  };

  function request() { return { type: keyWordConstants.KEYWORD_GETLIST_REQUEST }; }
  function success(keyWordList) { return { type: keyWordConstants.KEYWORD_GETLIST_SUCCESS, keyWordList }; }
  function failure(error) { return { type: keyWordConstants.KEYWORD_GETLIST_FAILURE, error }; }
}

function addKeyWord(title, description, iconBase64) {
  return dispatch => {
    dispatch(request(title));

    keyWordStoreService.addKeyWord(title, description, iconBase64)
      .then(
        (keyWord) => {
          dispatch(success(keyWord));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
  };

  function request() { return { type: keyWordConstants.KEYWORD_ADD_REQUEST }; }
  function success(keyWord) { return { type: keyWordConstants.KEYWORD_ADD_SUCCESS, keyWord }; }
  function failure(error) { return { type: keyWordConstants.KEYWORD_ADD_FAILURE, error }; }
}

export {
  addKeyWord,
  getList
};
