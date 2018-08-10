import React, { Component } from 'react';
import styled from 'styled-components';

const FlatSign = styled.span`
  font-size: 0.8em;
  margin: 0px -0.3em;
`;
let flatCounter = 0;

export default class KeyDisplay extends Component {
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
