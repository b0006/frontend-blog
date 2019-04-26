import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../../../../uploadAdapter';
import { commentActions, modalActions } from '../../../../redux/actions';

const CommentAdd = ({ addComment, showModal, hideModal, commentPid, commentPidLogin, currentArticle, user, changeParent }) => {
  const [onlyShow, setOnlyShow] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (user.role) {
      setOnlyShow(false);
    }
  }, []);

  const onContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const onAddComment = (content, pid, articleId) => {
    addComment(content, pid, articleId);
  };

  const onShowModal = () => {
    if (content.length <= 0) {
      return false;
    }

    showModal({
      open: true,
      title: 'Message',
      text: 'Are you sure you want to add new comment?',
      btnOkText: 'Add',
      btnCancelText: 'Cancel',
      confirmAction: () => { onAddComment(content, commentPid, currentArticle.id); },
      closeModal: () => { hideModal(); }
    }, 'confirm');
  };

  const MyCustomUploadAdapterPlugin = (editor) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  };

  const onRemoveParent = () => {
    changeParent(0, null);
  };

  const reply = commentPid > 0
    ? <span>Reply to {commentPidLogin}
      <button type="button" data-uk-close onClick={ onRemoveParent } /></span>
    : null;

  return (
    <form>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">New comment</legend>
        {reply}

        <div className="uk-margin">
          <div className="editor_block">
            <CKEditor
              editor={ ClassicEditor }
              disabled={ onlyShow }
              config={{
                extraPlugins: [MyCustomUploadAdapterPlugin]
              }}
              data={ content }
              onChange={ (event, editor) => {
                onContentChange(event, editor);
              } }
            />
          </div>
        </div>

        <div className="uk-margin">
          <input disabled={onlyShow} className="uk-button uk-button-primary" type="button" value="Comment" onClick={onShowModal} />
        </div>

      </fieldset>
    </form>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  const { commentPid, commentPidLogin } = state.comment;
  const { currentArticle } = state.article;
  return {
    user,
    commentPid,
    commentPidLogin,
    currentArticle
  };
};

const mapDispatchToProps = {
  showModal: modalActions.showModal,
  hideModal: modalActions.hideModal,
  changeParent: commentActions.changeParent,
  addComment: commentActions.addComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentAdd);
