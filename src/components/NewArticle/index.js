import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../../uploadAdapter';

import './NewArticle.css';
import { articleActions, modalActions } from '../../redux/actions';

const NewArticle = ({ addArticle, showModal, hideModal, user }) => {
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [content, setContent] = useState('');
  const [mainImageBase64, setMainImageBase64] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onChangeTitle = event => {
    let nextTitle = event.target.value;

    if (nextTitle.length > 10) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }

    setTitle(nextTitle);
  };

  const onAddArticle = (article) => {
    const { title, content, mainImageBase64 } = article;
    addArticle(title, content, mainImageBase64);
  };

  const onShowModal = () => {
    const article = { title, content, mainImageBase64 };

    let error = null;
    if (!title.length && !content.length) {
      error = 'Title and content are empty';
    } else if (!title.length && content.length) {
      error = 'Title is empty';
    } else if (title.length && !content.length) {
      error = 'Content is empty';
    }

    if (!error) {
      showModal({
        article,
        open: true,
        title: 'Message',
        text: `Are you sure you want to add "${title}"?`,
        btnOkText: 'Add',
        btnCancelText: 'Cancel',
        confirmAction: () => { onAddArticle(article); },
        closeModal: () => { hideModal(); }
      }, 'confirm');
    } else {
      setEditMode(error);
    }
  };

  const onContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const onChangeHeadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImageBase64(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const MyCustomUploadAdapterPlugin = (editor) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, title);
    };
  };

  if (user.role !== 1) {
    return <Redirect to="/" />;
  }

  const error = errorMsg ? errorMsg : null;

  return (
    <form>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">New article</legend>
        <div className="uk-margin">
          <input
            className="uk-input"
            type="text"
            placeholder="Title"
            maxLength="80"
            onChange={onChangeTitle}
          />
        </div>
        <div className="uk-margin">
          <div data-uk-grid>
            <div className="uk-width-1-2">
              <div data-uk-form-custom="target: true">
                <input type="file" onChange={onChangeHeadImage}/>
                <input className="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled />
              </div>
            </div>
            <div className="uk-width-1-4">
              <div className="uk-width-small">
                <img src={mainImageBase64} alt="main" data-uk-img/>
              </div>
            </div>
          </div>
        </div>

        <div className="uk-margin">
          <div className="editor_block">
            <CKEditor
              editor={ ClassicEditor }
              disabled={ !editMode }
              config={{
                extraPlugins: [MyCustomUploadAdapterPlugin]
              }}
              data={ content }
              onInit={ editor => {
                console.log('Editor is ready to use!', editor);
              } }
              onChange={ (event, editor) => {
                onContentChange(event, editor);
              } }
            />
          </div>
        </div>

        <div className="uk-margin">
          {error}
        </div>

        <div className="uk-margin">
          <input className="uk-button uk-button-primary" type="button" value="Add" onClick={onShowModal} />
        </div>

      </fieldset>
    </form>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  const { addArticleSuccess } = state.article;
  return {
    user,
    addArticleSuccess
  };
};

const mapDispatchToProps = {
  addArticle: articleActions.addArticle,
  showModal: modalActions.showModal,
  hideModal: modalActions.hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
