import React, { Component } from 'react';
import styled from 'styled-components';

import CommandRow from './view/CommandRow';
import Keyboard from './view/Keyboard';
import Editor from './view/Editor';
import {
  SectionHeader,
} from './component/Common';

const BetaContainer = styled.div`
  text-align: center;
`;

export default class BetaApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFunc: null,
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', event => {
      this.commandRow.handleKeyPress(event);
    });
  }
  onFunctionClick = (df: DiatonicFunction) => {
    this.commandRow.setDiatonicFunction(df);
  }
  onCommandPlay = (df: DiatonicFunction) => {
    this.setState({
      displayFunc: df,
    });
  }
  render() {
    const { displayFunc } = this.state;
    return (
      <BetaContainer>
        <Keyboard
          ref={(ref) => (this.keyboard = ref)}
          displayFunc={displayFunc}
        />

        <SectionHeader> Select a Keyboard Shortcut </SectionHeader>
        <CommandRow
          ref={(ref) => (this.commandRow = ref)}
          onCommandPlay={this.onCommandPlay}
        />

        <Editor onFunctionClick={this.onFunctionClick} />
      </BetaContainer>
    );
  }
}
