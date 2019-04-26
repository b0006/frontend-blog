import React, { useState } from 'react';
import { connect } from 'react-redux';

const AvatarPreview = ({ user }) => {
  const [avatarBase64, setAvatarBase64] = useState('https://getuikit.com/assets/uikit/tests/images/avatar.jpg');

  const onChangeAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setAvatarBase64(e.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const avatar = user.avatar ? user.avatar : avatarBase64;

  return (
    <div>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">Avatar</legend>
        <div className="uk-column-1-2">
          <div data-uk-form-custom="target: true">
            <input type="file" onChange={onChangeAvatar}/>
            <input className="uk-input uk-form-width-medium" type="text" placeholder="Choose new avatar" disabled />
          </div>
          <div>
            <img src={avatar} width="80" height="80" alt="main" data-uk-img/>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  return {
    user
  };
};

export default connect(mapStateToProps)(AvatarPreview);
