import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { commentActions } from '../../../../../redux/actions';

import './CommentItem.css';

const CommentItem = ({ authorName, authorId, authorLogin, authorAvatar, content, date, user, changeParent }) => {
  const onChangeParent = (parentId, parentLogin) => {
    changeParent(parentId, parentLogin);
  };

  const avatar = authorAvatar ? authorAvatar : 'https://getuikit.com/assets/uikit/tests/images/avatar.jpg';

  const replyBtn =
    <span
      className="uk-link-muted comment-replay"
      onClick={() => { onChangeParent(authorId, authorLogin); }}>Reply</span>;

  const reply = user.login === authorName || !user.role
    ? null
    : replyBtn;

  return (
    <article className="uk-comment uk-comment-primary uk-visible-toggle" tabIndex="-1">
      <header className="uk-comment-header uk-position-relative">
        <div className="uk-grid-medium uk-flex-middle" data-uk-grid>
          <div className="uk-width-auto">
            <img className="uk-comment-avatar" src={avatar} width="80" height="80" alt={authorName} />
          </div>
          <div className="uk-width-expand">
            <h4 className="uk-comment-title uk-margin-remove">
              <Link to={`/cabinet/${authorLogin}`}>{authorName}</Link>
            </h4>
            <p className="uk-comment-meta uk-margin-remove-top">
              {date}
            </p>
          </div>
        </div>
        <div className="uk-position-top-right uk-position-small uk-hidden-hover">
          {reply}
        </div>
      </header>
      <div className="uk-comment-body">
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </article>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  return {
    user
  };
};

const mapDispatchToProps = {
  changeParent: commentActions.changeParent
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
