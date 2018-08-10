import React, { Component } from 'react';
import styled from 'styled-components';
import KeyDisplay from './KeyDisplay';

const ChordButtonContainer = styled.div`
  border: 4px solid var(--foreground);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  margin: 10px;
  min-width: 100px;
  min-height: 90px;
  padding-bottom: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > * {
    width: 100%;
  }

  ${props => props.isFocused && `
    border-color: var(--highlight);
  `};
`;
const ButtonHeader = styled.div`
  background-color: var(--foreground);
  color: var(--background);

  height: 20px;
  line-height: 20px;
  font-size: 18px;

  ${props => props.isFocused && `
    background-color: var(--highlight);
  `};
`;
const ButtonTextLarge = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
const ButtonTextSmall = styled.div`
  font-size: 0.8rem;
`;
const ChordInversionText = styled.div`
  font-size: 0.5em;
  display: inline-block;
  vertical-align: text-top;
  width: 0px;
  padding-left: 5px;
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
      octave,
      chordSymbol,
      superScript,
      inversionText,
      notes,
    } = df ? df.getFunctionRole() : {};
    const onClick = callback ? () => callback(df) : () => {};
    return (
      <ChordButtonContainer onClick={onClick} isFocused={isFocused}>
        <ButtonHeader isFocused={isFocused}>
          <KeyDisplay value={tonicSymbol} />
        </ButtonHeader>
        <ButtonTextLarge>
          <KeyDisplay value={chordSymbol || '...'} />
          { superScript && <sup>{ superScript }</sup> }
          { inversionText && (
            <ChordInversionText>
              { inversionText }
            </ChordInversionText>
          )}
        </ButtonTextLarge>
        { notes && (
          <ButtonTextSmall>
            <KeyDisplay value={notes.join(' ')} />
          </ButtonTextSmall>
        )}
        { octave && (
          <ButtonTextSmall>
            {octave}
          </ButtonTextSmall>
        )}
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