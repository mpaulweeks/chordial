import React, { Component } from 'react';
import styled from 'styled-components';

const ChordButtonContainer = styled.div`
  border: 1px solid var(--foreground);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  margin: 10px;

  ${props => props.isFocused && `
    border-color: var(--highlight);
  `};
`;
const ButtonHeader = styled.div`
  background-color: var(--foreground);
  color: var(--background);

  font-size: 14px;
  padding: 2px;
`;
const ButtonTextLarge = styled.div`
  padding: 15px 30px;
  font-size: 24px;
  font-weight: bold;
`;

export class ChordButton extends Component {
  render() {
    const {
      chord,
      callback,
    } = this.props;
    const pitch = chord.getRootPitch();
    return (
      <ChordButtonContainer onClick={() => callback(chord)}>
        <ButtonTextLarge>{ pitch.letter }</ButtonTextLarge>
      </ChordButtonContainer>
    );
  }
}

export class DiatonicFunctionButton extends Component {
  render() {
    const {
      df,
      callback,
    } = this.props;
    const role = df.getFunctionRole();
    return (
      <ChordButtonContainer onClick={() => callback(df)}>
        <ButtonHeader>{ role.tonicSymbol }</ButtonHeader>
        <ButtonTextLarge>
          { role.chordSymbol }
          { role.superScript && <sup>{ role.superScript }</sup> }
        </ButtonTextLarge>
      </ChordButtonContainer>
    );
  }
}

export class CommandButton extends Component {
  render() {
    const {
      isFocused,
      callback,
    } = this.props;
    const {
      key,
      df,
    } = this.props.command;
    const {
      tonicSymbol,
      chordSymbol,
      superScript,
    } = df ? df.getFunctionRole() : {};
    return (
      <ChordButtonContainer onClick={() => callback(key)} isFocused={isFocused}>
        <ButtonHeader>{ tonicSymbol }</ButtonHeader>
        <ButtonTextLarge>
          { chordSymbol || '...'}
          { superScript && <sup>{ superScript }</sup> }
        </ButtonTextLarge>
        <ButtonHeader>{ key }</ButtonHeader>
      </ChordButtonContainer>
    );
  }
}

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export {
  ButtonRow,
}
