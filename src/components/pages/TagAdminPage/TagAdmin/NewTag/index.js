import React, { useState } from 'react';
import { connect } from 'react-redux';
import { keyWordActions, modalActions } from '../../../../../redux/actions';

const NewTag = ({ showModal, hideModal, addKeyWord }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconBase64, setIconBase64] = useState(null);

  const onChangeTitle = (event) => { setTitle(event.target.value); };
  const onChangeDesc = (event) => { setDescription(event.target.value); };
  const onChangeIcon = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setIconBase64(e.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onShowModal = () => {
    const keyWord = { title, description, iconBase64 };

    if (title && description && iconBase64) {
      showModal({
        keyWord,
        open: true,
        title: 'Message',
        text: `Are you sure you want to add "${title}"?`,
        btnOkText: 'Add',
        btnCancelText: 'Cancel',
        confirmAction: () => { onAddKeyWord(keyWord); },
        closeModal: () => { hideModal(); }
      }, 'confirm');
    }
  };

  const onAddKeyWord = (article) => {
    const { title, description, iconBase64 } = article;
    addKeyWord(title, description, iconBase64);
  };

  return (
    <form>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">New Tag</legend>
        <div className="uk-margin">
          <input
            className="uk-input"
            type="text"
            placeholder="Title"
            maxLength="15"
            onChange={onChangeTitle}
          />
        </div>

        <div className="uk-margin">
          <textarea
            className="uk-textarea"
            placeholder="Description"
            maxLength="150"
            onChange={onChangeDesc}
          />
        </div>

        <div className="uk-margin">
          <div data-uk-grid>
            <div className="uk-width-1-2">
              <div data-uk-form-custom="target: true">
                <input type="file" onChange={onChangeIcon}/>
                <input className="uk-input uk-form-width-medium" type="text" placeholder="Select icon" disabled />
              </div>
            </div>
            <div className="uk-width-1-4">
              <div className="uk-width-small">
                <img src={iconBase64} alt="main" data-uk-img/>
              </div>
            </div>
          </div>
        </div>

        <div className="uk-margin">
          <input className="uk-button uk-button-primary" type="button" value="Add" onClick={onShowModal} />
        </div>

      </fieldset>
    </form>
  );
};

const mapDispatchToProps = {
  addKeyWord: keyWordActions.addKeyWord,
  showModal: modalActions.showModal,
  hideModal: modalActions.hideModal
};

export default connect(null, mapDispatchToProps)(NewTag);
