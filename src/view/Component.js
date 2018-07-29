import React, { Component } from 'react';
import styled from 'styled-components';

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
  min-width: 40px;
  padding: 0px 10px;
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

const FlatSign = styled.span`
  font-size: 0.8em;
  margin: 0px -0.3em;
`;
let flatCounter = 0;
class KeyDisplay extends Component {
  render() {
    const text = String(this.props.value || '');
    return (
      <span>
        {text.split('').map((char, i) => (
          char !== '♭' ? char : (
            <FlatSign key={'flat-'+flatCounter++}>♭</FlatSign>
          )
        ))}
      </span>
    );
  }
}


export {
  ButtonRow,
  SelectContainer,
  SelectSectionContainer,
  SelectSectionHeader,
}
