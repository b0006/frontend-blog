import React from 'react';
import CommentList from './CommentList';
import CommentAdd from './CommentAdd';

const CommentBlock = () => {
  return (
    <div>
      <CommentAdd />
      <CommentList />
    </div>
  );
};

export default CommentBlock;
