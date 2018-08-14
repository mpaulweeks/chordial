import React, { Component } from 'react';
import styled from 'styled-components';

const KeyboardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: no-wrap;

  font-size: 10px;
  & > div {
    box-sizing: border-box;
  }
  & > div:first-child {
    border-left-width: 2px;
  }
  & > div:last-child {
    border-right-width: 2px;
  }
`;

const WhiteKey = styled.div`
  height: 10em;
  width: 3em;
  border: 1px solid black;
  border-top-width: 2px;
  border-bottom-width: 2px;
  background-color: white;

  ${props => props.highlight && `
    border-color: black;
    background-color: var(--highlight);
  `}
`;

const BlackKey = styled.div`
  height: 5em;
  width: 2em;
  margin: 0px -1em;
  border: 2px solid black;
  background-color: black;
  z-index: 10;

  ${props => props.highlight && `
    border-color: black;
    background-color: var(--highlight);
  `}
`;

export default class Keyboard extends Component {
  constructor(props) {
    super(props);

    const blackKeys = [1, 4, 6, 9, 11];
    const keys = [];
    for (var i = 12*2 + 3; i < 12*6 + 3; i++){
      keys.push({
        step: i,
        isBlack: blackKeys.includes(i % 12),
      });
    }
    this.state = {
      keys: keys,
    };
  }
  render() {
    const { keys } = this.state;
    const { displayFunc } = this.props;
    const toHighlight = displayFunc ? displayFunc.chord.notes.map(n => n.step) : [];
    return (
      <KeyboardContainer className='desktop-only'>
        {keys.map((key, ki) => (
          key.isBlack
          ? <BlackKey key={'kb-'+ki} highlight={toHighlight.includes(key.step)} />
          : <WhiteKey key={'kb-'+ki} highlight={toHighlight.includes(key.step)} />
        ))}
      </KeyboardContainer>
    )
  }
}
