import React, { Component } from 'react';
import styled from 'styled-components';

const ChordButtonContainer = styled.div`
  border: 4px solid var(--foreground);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  margin: 10px;
  min-width: 100px;

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
  padding: 15px 0px;
  font-size: 1.5rem;
  font-weight: bold;
`;
const ButtonTextSmall = styled.div`
  font-size: 0.8rem;
`;
const CommandLabel = styled.div`
  text-align: center;
  padding: 5px 0px;
  font-weight: bold;
  font-size: 1.5rem;
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
      notes,
    } = df ? df.getFunctionRole() : {};
    const onClick = callback ? () => callback(df) : () => {};
    return (
      <ChordButtonContainer onClick={onClick} isFocused={isFocused}>
        <ButtonHeader isFocused={isFocused}>{ tonicSymbol }</ButtonHeader>
        <ButtonTextLarge>
          { chordSymbol || '...'}
          { superScript && <sup>{ superScript }</sup> }
        </ButtonTextLarge>
        { notes && <ButtonTextSmall>{ notes.join(' ') }</ButtonTextSmall> }
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
        <CommandLabel>Key: { key }</CommandLabel>
      </div>
    );
  }
}

const OptionButtonContainer = styled.div`
  border: 4px solid var(--foreground);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  height: 40px;
  width: 60px;
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
        { label }
      </OptionButtonContainer>
    );
  }
}

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const SelectSectionContainer = styled.div`
  flex: 1;
`;
const SelectSectionHeader = styled.div`
  font-size: 2em;
  font-weight: bold;

  margin: 20px;
`;


export {
  ButtonRow,
  SelectContainer,
  SelectSectionContainer,
  SelectSectionHeader,
}
