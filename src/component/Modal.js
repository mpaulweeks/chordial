import React, { Component } from 'react';
import styled from 'styled-components';

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
`;
const ModalInner = styled.div`
  padding: 20px;

  background-color: var(--background);
  border: 2px solid var(--foreground);
  border-radius: 50px;
`;
export default class Modal extends Component {
  render() {
    return (
      <ModalOuter>
        <ModalInner>
          {this.props.children}
        </ModalInner>
      </ModalOuter>
    );
  }
}