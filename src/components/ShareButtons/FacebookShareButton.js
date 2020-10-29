import React from 'react';
import { IconButton } from './ShareButtons.styled';
import facebookIcon from 'assets/icons/facebook.svg';

const FacebookShareButton = () => {
  function shareOnFacebook() {
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href,
      'facebook-share-dialog',
      'width=800,height=600',
    );
    return false;
  }
  return (
    <IconButton>
      <button onClick={shareOnFacebook}>
        <img src={facebookIcon} alt="icone do facebook" />
      </button>
    </IconButton>
  );
};

export default FacebookShareButton;
