import React, { Component } from 'react';
import styled from 'styled-components';

const ChordButtonContainer = styled.div`
  border: 4px solid var(--foreground);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  margin: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${props => props.isFocused && `
    border-color: var(--highlight);
  `};
`;
const ButtonHeader = styled.div`
  background-color: var(--foreground);
  color: var(--background);

  min-height: 10px;
  width: 100%;

  font-size: 14px;
  padding: 2px 0px;

  ${props => props.isFocused && `
    background-color: var(--highlight);
  `};
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
    const { df, isFocused, callback } = this.props;
    const {
      tonicSymbol,
      chordSymbol,
      superScript,
    } = df ? df.getFunctionRole() : {};
    const onClick = callback ? () => callback(df) : () => {};
    return (
      <ChordButtonContainer onClick={onClick} isFocused={isFocused}>
        <ButtonHeader isFocused={isFocused}>{ tonicSymbol }</ButtonHeader>
        <ButtonTextLarge>
          { chordSymbol || '...'}
          { superScript && <sup>{ superScript }</sup> }
        </ButtonTextLarge>
      </ChordButtonContainer>
    )
  }
}

export class CommandButton extends Component {
  render() {
    const {
      command,
      isFocused,
      callback,
    } = this.props;
    const { key } = command;
    return (
      <div onClick={() => callback(key)}>
        <DiatonicFunctionButton df={command.df} isFocused={isFocused} />
        <h3>{ key }</h3>
      </div>
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
