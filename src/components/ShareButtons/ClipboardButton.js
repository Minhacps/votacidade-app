import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import colors from 'styles/colors';

const StyledButton = styled.button`
  height: 35px;
  display: inline-block;
  background: ${colors.purple};
  color: #fff;
  text-align: center;
  font-size: 12px;
  border: 0;
  border-radius: 10px;
  padding: 5px 15px;
`;

const ClipboardTooltip = styled.p`
  margin: 0 5px;
  font-size: 12px;
`;

const ClipboardButton = ({ children, text }) => {
  const hiddenTextRef = useRef(null);
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  const copyToClipboard = () => {
    hiddenTextRef.current.type = 'text';
    hiddenTextRef.current.select();
    document.execCommand('copy');
    hiddenTextRef.current.type = 'hidden';
    setHasCopiedLink(true);
  };

  useEffect(() => {
    let timer;
    if (hasCopiedLink) {
      timer = setTimeout(() => {
        setHasCopiedLink(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [hasCopiedLink]);

  return (
    <>
      <input
        ref={hiddenTextRef}
        aria-hidden
        type="hidden"
        defaultValue={`${text}`}
      />
      <StyledButton onClick={copyToClipboard}>{children}</StyledButton>
      {hasCopiedLink && (
        <ClipboardTooltip role="alert">Link copiado</ClipboardTooltip>
      )}
    </>
  );
};

export default ClipboardButton;
