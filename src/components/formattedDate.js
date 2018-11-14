import React from 'react';
import styled from 'react-emotion';

const Time = styled('time')`
  opacity: 0.5;
`;

const FormattedDate = ({ date }) => (
  <Time dateTime={date.toISOString()}>{date.format('YYYY.MM.DD')}</Time>
);

export default FormattedDate
