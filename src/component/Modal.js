import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Clickable,
} from './Common';

const ModalOuter = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;

  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;

  ${props => !props.modalOpen && `
    display: none;
  `}
`;
const ModalInner = styled.div`
  position: relative;

  padding: 20px;

  background-color: var(--background);
  border: 2px solid var(--foreground);
  border-radius: 50px 0px 50px 50px;
`;
const ExitBig = styled(Clickable)`
  --size: 20px;

  position: absolute;
  top: -2px;
  right: -2px;

  width: calc(2 * var(--size));
  height: calc(2 * var(--size));
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export default class Modal extends Component {
  render() {
    return (
      <ModalOuter modalOpen={this.props.modalOpen}>
        <ModalInner>
          {this.props.children}
          <ExitBig onClick={this.props.onExit}>
            X
          </ExitBig>
        </ModalInner>
      </ModalOuter>
    );
  }
}
