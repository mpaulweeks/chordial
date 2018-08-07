import React, { Component } from 'react';
import styled from 'styled-components';
import KeyDisplay from './KeyDisplay';
import {
  ButtonRow,
} from './Common';

const OptionRow = styled(ButtonRow)`
  & > div {
    margin: 0px;
    border-width: 2px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-radius: 0px;

    --taper: 10%;
  }
  & > div:first-child {
    border-left-width: 2px;
    border-top-left-radius: var(--taper);
    border-bottom-left-radius: var(--taper);
  }
  & > div:last-child {
    border-right-width: 2px;
    border-top-right-radius: var(--taper);
    border-bottom-right-radius: var(--taper);
  }
`;

const OptionButtonContainer = styled.div`
  border: 4px solid var(--foreground);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  height: 40px;
  padding: 0px 15px;
  margin: 10px;
  font-size: 1.2em;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${props => props.isFocused && `
    border-color: var(--highlight);
    background-color: var(--highlight);
    color: var(--background);
  `};
`;
export class OptionButton extends Component {
  render() {
    const {
      label,
      value,
      callback,
      isFocused,
    } = this.props;
    const onClick = () => callback(value);
    return (
      <OptionButtonContainer onClick={onClick} isFocused={isFocused}>
        <KeyDisplay value={label} />
      </OptionButtonContainer>
    );
  }
}
export {
  OptionRow,
};