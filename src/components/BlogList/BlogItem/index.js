import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './BlogItem.css';
import Button from '../../../containers/Button';
import iconTemp from './nodejs-1440x900.png';
import { articleActions, modalActions } from '../../../redux/actions';
import { articleConstants } from '../../../redux/constants';

const BlogItem = ({ img, description, title, icon, value, id, showModal, hideModal, deleteArticle, loggedIn, user }) => {
  const closeModal = () => { hideModal(); };
  const onDeleteArticle = (articleId) => { deleteArticle(articleId); };

  const openConfirmModal = (articleId, articleTitle) => {
    showModal({
      action: articleConstants.ARTICLE_DELETE_REQUEST,
      articleId: articleId,
      open: true,
      title: 'Delete',
      text: `Are you sure you want to delete "${articleTitle}"?`,
      btnOkText: 'Delete',
      btnCancelText: 'Cancel',
      confirmAction: () => { onDeleteArticle(articleId); },
      closeModal: closeModal
    }, 'confirm');
  };

  let blogImg = img;
  if (!blogImg) {
    blogImg = iconTemp;
  }

  const deleteBtn = loggedIn && user.role === 1
    ? <Button onHandlerClick={() => openConfirmModal(id, title)} btnText="Delete" />
    : null;

  return (
    <div className="blog-item">
      <div>
        {deleteBtn}
        <Link to={`/article/${value}`}>
          <div className="blog-item-preview ">
            <img src={blogImg} alt={title} />
          </div>

          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    user
  };
};

const mapDispatchToProps = {
  showModal: modalActions.showModal,
  hideModal: modalActions.hideModal,
  deleteArticle: articleActions.deleteArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);
