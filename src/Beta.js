import React, { Component } from 'react';
import styled from 'styled-components';

import CommandRow from './view/CommandRow';
import Editor from './view/Editor';
import {
  SelectSectionHeader,
} from './view/Component';

const BetaContainer = styled.div`
  text-align: center;
`;

class BetaApp extends Component {
  componentDidMount() {
    document.addEventListener('keydown', event => {
      this.commandRow.handleKeyPress(event);
    });
  }
  onFunctionClick = (df: DiatonicFunction) => {
    this.commandRow.setDiatonicFunction(df);
  }
  render() {
    return (
      <BetaContainer>
        <SelectSectionHeader> Select a Keyboard Shortcut </SelectSectionHeader>
        <CommandRow ref={(ref) => (this.commandRow = ref)} onCommandUpdate={this.onCommandUpdate} />

        <Editor onFunctionClick={this.onFunctionClick} />
      </BetaContainer>
    );
  }
}

export default BetaApp;
