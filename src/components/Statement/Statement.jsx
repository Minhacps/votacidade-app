import React from 'react';

import LongParagraph from 'components/atoms/LongParagraph'

const Statement = ({ number, text }) =>
  (
    <LongParagraph className="h5 mb-0">
      <small className="text-muted">{number}.</small>
      &nbsp;
      <span>{text}</span>
    </LongParagraph>
  );

export default Statement;
