import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../../../containers/Spinner';
import { keyWordActions } from '../../../../../redux/actions';

const TagList = ({ getList, keyWordList, keyWordLoading }) => {
  useEffect(() => {
    getList();
  }, []);

  if (keyWordLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <legend className="uk-legend">Tag list</legend>
      <ul className="uk-list uk-list-striped">
        {
          keyWordList.map(item => (
            <li key={item.id}>
              <span>{item.title}</span>
              <button className="uk-button uk-button-primary uk-margin-left">Edit</button>
              <button className="uk-button uk-button-danger uk-margin-left">Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { keyWordList, keyWordLoading } = state.keyWord;
  return {
    keyWordList,
    keyWordLoading
  };
};

const mapDispatchToProps = {
  getList: keyWordActions.getList
};

export default connect(mapStateToProps, mapDispatchToProps)(TagList);
