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

const ChordRow = styled.div`
  display: flex;
`;
export {
  ChordRow,
}