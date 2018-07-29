import React, { Component } from 'react';
import styled from 'styled-components';
import MIDISounds from 'midi-sounds-react';

import Controller from '../audio/Controller';

const Hidden = styled.div`
  display: none;
`;

export default class MidiLoader extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <Hidden>
      </Hidden>
    );
  }
}