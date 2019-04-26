import { commentConstants } from '../../constants';

const initialState = {
  commentListLoading: true,
  commentLoading: true,
  commentError: null,
  commentList: [
    {
      id: 1,
      authorName: 'b0006',
      authorId: 1,
      authorLogin: 'b0006',
      authorAvatar: 'https://getuikit.com/assets/uikit/tests/images/avatar.jpg',
      date: '23.04.2019',
      content: '<p>Hello, mister</p>',
      children: [{
        id: 2,
        authorName: 'Jerry',
        authorId: 41,
        authorLogin: 'jerry2',
        authorAvatar: 'https://getuikit.com/assets/uikit/tests/images/avatar.jpg',
        date: '23.04.2012',
        content: '<p>Helddo, Tom</p>',
        children: [
          {
            id: 4,
            authorName: 'Saha',
            authorId: 43,
            authorLogin: 'Saha222',
            authorAvatar: 'https://getuikit.com/assets/uikit/tests/images/avatar.jpg',
            date: '23.14.1019',
            content: '<p>Hi, mis44ter</p>',
            children: []
          }
        ]
      },
      {
        id: 6,
        authorName: 'Dimanos',
        authorId: 91,
        authorLogin: 'Dimanos',
        authorAvatar: 'https://getuikit.com/assets/uikit/tests/images/avatar.jpg',
        date: '213.14.2019',
        content: '<p>Hi, mis44ter</p>',
        children: []
      }]
    },
    {
      id: 3,
      authorName: 'Mike',
      authorId: 55,
      authorLogin: 'mike_777',
      authorAvatar: 'https://getuikit.com/assets/uikit/tests/images/avatar.jpg',
      date: '23.14.3019',
      content: '<p>Hi, mis44ter</p>',
      children: [
        {
          id: 5,
          authorName: '222',
          authorId: 51,
          authorLogin: 'Saha33222',
          authorAvatar: 'https://getuikit.com/assets/uikit/tests/images/avatar.jpg',
          date: '23.14.1019',
          content: '<p>Hi, mis44ffter</p>',
          children: []
        }
      ]
    }
  ],
  commentPid: 0,
  commentPidLogin: null
};

const comment = (state = initialState, action) => {
  switch (action.type) {
  case commentConstants.COMMENT_GETLIST_REQUEST:
    return {
      ...state,
      commentListLoading: true
    };
  case commentConstants.COMMENT_GETLIST_SUCCESS:
    return {
      ...state,
      commentListLoading: false,
      commentList: action.commentList
    };
  case commentConstants.COMMENT_GETLIST_FAILURE:
    return {
      ...state,
      commentError: action.error
    };

  case commentConstants.COMMENT_ADD_REQUEST:
    return {
      ...state,
      commentLoading: true
    };
  case commentConstants.COMMENT_ADD_SUCCESS:
    return {
      ...state,
      // commentList: action.commentList,
      commentLoading: false
    };
  case commentConstants.COMMENT_ADD_FAILURE:
    return {
      ...state,
      commentError: action.error
    };

  case commentConstants.COMMENT_CHANGE_PARENT:
    return {
      ...state,
      commentPid: action.pid,
      commentPidLogin: action.parentLogin
    };

  default:
    return state;
  }
};

export {
  comment
};
