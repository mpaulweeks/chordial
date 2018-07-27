import React, { Component } from 'react';
import styled from 'styled-components';

const ChordButtonContainer = styled.div`
  padding: 15px 30px;
  border: 1px solid var(--foreground);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  margin: 10px;
`;
const ChordButtonLarge = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
const ChordButtonSmall = styled.div`
  font-size: 14px;
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
        <ChordButtonLarge>{ pitch.letter }</ChordButtonLarge>
        <ChordButtonSmall>{ pitch.octave }</ChordButtonSmall>
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
    const pitch = df.chord.getRootPitch();
    return (
      <ChordButtonContainer onClick={() => callback(df)}>
        <ChordButtonLarge>
          { role.symbol }
          { role.superScript && <sup>{ role.superScript }</sup> }
        </ChordButtonLarge>
        <ChordButtonSmall>{ pitch.letter }{ pitch.octave }</ChordButtonSmall>
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