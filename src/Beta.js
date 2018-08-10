import React, { Component } from 'react';
import styled from 'styled-components';

import CommandRow from './view/CommandRow';
import Keyboard from './view/Keyboard';
import Editor from './view/Editor';
import {
  SectionHeader,
} from './component/Common';

const BetaContainer = styled.div`
  width: 100%;
  height: 100%;

  text-align: center;
  padding: 20px;
  box-sizing: border-box;

  ${props => props.isDark ? `
    --foreground: #FFF;
    --background: #444;
    --highlight: yellow;
  ` : `
    --foreground: black;
    --background: white;
    --highlight: blue;
  `}

  background-color: var(--background);
  color: var(--foreground);

  & a {
    color: var(--foreground);
  }
`;

const DarkToggle = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  cursor: pointer;
`;

export default class BetaApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFunc: null,
      isDark: false,
    };
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
  onToggleDark = () => {
    this.setState({
      isDark: !this.state.isDark,
    });
  }
  render() {
    const { displayFunc, isDark } = this.state;
    return (
      <BetaContainer isDark={isDark}>
        <Keyboard
          ref={(ref) => (this.keyboard = ref)}
          displayFunc={displayFunc}
        />

        <SectionHeader> Select a Keyboard Shortcut </SectionHeader>
        <CommandRow
          ref={(ref) => (this.commandRow = ref)}
          onCommandPlay={this.onCommandPlay}
        />

        <DarkToggle onClick={this.onToggleDark}>
          {isDark ? 'light mode' : 'dark mode'}
        </DarkToggle>
        <Editor onFunctionClick={this.onFunctionClick} />
      </BetaContainer>
    );
  }
}
