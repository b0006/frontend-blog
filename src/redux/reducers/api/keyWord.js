import { keyWordConstants } from '../../constants';

const initialState = {
  errorKeyWord: null,
  keyWordLoading: true,
  keyWordList: [
    {
      id: 1,
      title: 'tag N1',
      description: 'description1',
      img: 'http://localhost:5000/images/keywords/article_6e6893ea17a1a11d28300383790974e1'
    },
    {
      id: 2,
      title: 'tag N2',
      description: 'description2',
      img: 'http://localhost:5000/images/keywords/article_6e6893ea17a1a11d28300383790974e1'
    }
  ]
};

const keyWord = (state = initialState, action) => {
  switch (action.type) {
  case keyWordConstants.KEYWORD_GETLIST_REQUEST:
    return {
      ...state,
      keyWordLoading: true
    };
  case keyWordConstants.KEYWORD_GETLIST_SUCCESS:
    return {
      ...state,
      keyWordList: action.keyWordList,
      keyWordLoading: false
    };
  case keyWordConstants.KEYWORD_GETLIST_FAILURE:
    return {
      ...state,
      errorKeyWord: action.error
    };

  case keyWordConstants.KEYWORD_ADD_REQUEST:
    return state;
  case keyWordConstants.KEYWORD_ADD_SUCCESS:
    return {
      ...state,
      keyWordList: addKeyWord(action.keyWord, state.keyWordList),
      errorKeyWord: null
    };
  case keyWordConstants.KEYWORD_ADD_FAILURE:
    return {
      ...state,
      errorKeyWord: action.error
    };

  default:
    return state;
  }
};

function addKeyWord(newKeyWord, keyWordList) {
  let newArray = keyWordList.slice();
  newArray.splice(0, 0, newKeyWord);
  return newArray;
}

export {
  keyWord
};
