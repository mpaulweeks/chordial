import React, { Component } from 'react';

import { getAllKeys } from '../audio/Type';
import {
  ButtonRow,
} from './Component';

export default class SelectKey extends Component {
  constructor(props){
    super(props);
    this.state = {
      allKeys: getAllKeys(),
    };
  }
  componentDidMount() {
    this.props.setRootKey(this.state.allKeys[0].step);
  }
  render() {
    const {
      currentRootKey,
      setRootKey,
    } = this.props;
    const {
      allKeys,
    } = this.state;
    return (
      <ButtonRow>
        <select value={currentRootKey} onChange={e => setRootKey(parseFloat(e.target.value))}>
          {allKeys.map((ak, aki) => (
            <option key={'root'+aki} value={ak.step}>{ak.letter}</option>
          ))}
        </select>
      </ButtonRow>
    );
  }
}
