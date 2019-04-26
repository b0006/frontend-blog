import React from 'react';

const ArticleInner = ({ title, text }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <p dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
};

export default ArticleInner;
