import React from 'react';
import NewTag from './NewTag';
import TagList from './TagList';

const TagAdmin = () => {
  return (
    <div className="uk-child-width-1-2" data-uk-grid>
      <NewTag />
      <TagList />
    </div>
  );
};

export default TagAdmin;
