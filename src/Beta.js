import React, { Component } from 'react';
import styled from 'styled-components';

import CommandRow from './view/CommandRow';
import Keyboard from './view/Keyboard';
import Editor from './view/Editor';
import {
  SectionHeader,
  ButtonRow,
  MediumButton,
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

const CookieName = {
  IsDark: 'is_dark',
};
const CookieOptions = {
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

export default class BetaApp extends Component {
  constructor(props) {
    super(props);

    this.cookies = props.cookies;

    this.state = {
      displayFunc: null,
      isDark: this.cookies.get(CookieName.IsDark) === "true",
      modalOpen: false,
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', event => {
      if (this.state.modalOpen){
        this.editor.handleKeyPress(event);
      } else {
        this.commandRow.handleKeyPress(event);
      }
    });
  }
  onFunctionSet = (df: DiatonicFunction) => {
    this.commandRow.setDiatonicFunction(df);
  }
  onCommandPlay = (df: DiatonicFunction) => {
    this.setState({
      displayFunc: df,
    });
  }
  onCommandCreate = () => {
    this.onToggleModal();
  }
  onCommandEdit = (df: DiatonicFunction) => {
    this.editor.setDefaults(df);
    this.onToggleModal();
  }
  onToggleDark = () => {
    const newIsDark = !this.state.isDark;
    this.cookies.set(CookieName.IsDark, newIsDark, CookieOptions);
    this.setState({
      isDark: newIsDark,
    });
  }
  onToggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }
  render() {
    const {
      displayFunc,
      isDark,
      modalOpen,
    } = this.state;
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
          onCommandEdit={this.onCommandEdit}
          onCommandCreate={this.onCommandCreate}
        />
        <ButtonRow>
          <MediumButton onClick={this.onToggleDark}>
            switch to {isDark ? 'light' : 'dark'} mode
          </MediumButton>
        </ButtonRow>

        <Editor
          ref={(ref) => (this.editor = ref)}
          onFunctionSet={this.onFunctionSet}
          modalOpen={modalOpen}
          closeModal={this.onToggleModal}
        />
      </BetaContainer>
    );
  }
}
