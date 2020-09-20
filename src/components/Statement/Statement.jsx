import React from 'react';

import LongParagraph from 'components/atoms/LongParagraph'

const Statement = ({ order, text }) =>
  (
    <LongParagraph className="h5 mb-4">
      <small className="text-muted">{order}.</small>
      &nbsp;
      <span>{text}</span>
    </LongParagraph>
  );

export default Statement;
