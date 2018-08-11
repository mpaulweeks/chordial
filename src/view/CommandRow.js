import React, { Component } from 'react';
import styled from 'styled-components';

import Preset from '../audio/Preset';
import DiatonicFunction from '../audio/DiatonicFunction';
import {
  ButtonRow,
} from '../component/Common';
import { CommandButton } from '../component/Playable';

const UrlContainer = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.17rem;
  margin: 1rem;
`;

const COMMAND_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// quick replacement for query-string
const queryString = {
  parse: search => {
    const parts = search.split('?').pop().split('&');
    const result = {};
    parts.forEach(p => {
      const param = p.split('=');
      const key = param[0];
      const value = param[1];
      if (result[key] && Array.isArray(result[key])){
        result[key].push(value);
      } else if (result[key]) {
        result[key] = [result[key], value];
      } else {
        result[key] = value;
      }
    });
    return result;
  },
  stringify: obj => {
    const result = [];
    for (let key in obj){
      const value = obj[key];
      if (Array.isArray(value)){
        value.forEach(elm => {
          result.push(key + '=' + elm);
        });
      } else {
        result.push(key + '=' + value);
      }
    }
    return result.join('&');
  },
};

export default class CommandRow extends Component {
  constructor() {
    super();

    const commands = COMMAND_KEYS.reduce((map, key) => {
      map[key] = {
        key: key,
        df: null,
      };
      return map;
    }, {});
    this.state = {
      ...commands,
      focusIndex: COMMAND_KEYS[0],
      shareUrl: '',
    };
  }
  promiseState(newState) {
    return new Promise((resolve, reject) => {
      this.setState(newState, resolve);
    });
  }
  componentDidMount() {
    let dfs = Preset.dfs;
    const parsed = queryString.parse(window.location.search);
    let serialized = parsed.df;
    if (serialized){
      if (typeof(serialized) === 'string'){
        serialized = [serialized];
      }
      dfs = serialized.map(DiatonicFunction.fromSerialized);
    }

    const newState = COMMAND_KEYS.reduce((map, key, index) => {
      map[key] = {
        ...this.state[key],
        df: dfs[index] || null,
      };
      return map;
    }, {});
    this.promiseState(newState)
      .then(() => this.updateShareUrl())
      .then(() => this.setFocus(COMMAND_KEYS[0]))
  }

  handleKeyPress(event) {
    const key = event.key.toLowerCase();

    if (COMMAND_KEYS.includes(key)){
      this.setFocus(key);
    }
    if (key === 'arrowleft'){
      this.stepFocus(-1);
    }
    if (key === 'arrowright'){
      this.stepFocus(1);
    }
    if (['backspace', 'delete'].includes(key)){
      this.setDiatonicFunction(null);
    }
  }
  stepFocus(delta: number) {
    const { focusIndex } = this.state;
    const keysIndex = COMMAND_KEYS.indexOf(focusIndex);
    const commandIndex = (keysIndex + delta + COMMAND_KEYS.length) % COMMAND_KEYS.length;
    this.setFocus(COMMAND_KEYS[commandIndex]);
  }
  setFocus(key: string) {
    this.setState({
      focusIndex: key,
    }, () => {
      this.playCurrent();
      this.onFocus();
    });
  }
  setDiatonicFunction(df: DiatonicFunction) {
    const { focusIndex } = this.state;
    const newState = {};
    newState[focusIndex] = {
      ...this.state[focusIndex],
      df: df,
    };
    this.promiseState(newState)
      .then(() => this.updateShareUrl())
      .then(() => this.onFocus())
  }
  getFocus(){
    return this.state[this.state.focusIndex];
  }
  playCurrent(){
    const current = this.getFocus();
    if (current.df){
      current.df.chord.stop();
      current.df.chord.play(0, 1);
    }
  }
  updateShareUrl() {
    const dfs = COMMAND_KEYS.reduce((arr, key) => {
      const df = this.state[key].df;
      if (df){
        arr.push(df);
      }
      return arr;
    }, []);
    const qs = queryString.stringify({
      df: dfs.map(df => df.toSerialized()),
    });
    return this.promiseState({
      shareUrl: '?' + qs,
    });
  }
  onFocus(){
    return new Promise((resolve, reject) => {
      this.props.onCommandPlay(this.getFocus().df);
      resolve();
    });
  }
  render() {
    const {
      focusIndex,
      shareUrl,
    } = this.state;
    const {
      onCommandCreate,
      onCommandEdit,
      onCommandDelete,
    } = this.props;

    const wrapCommandCreate = (key: string) => {
      this.setFocus(key);
      onCommandCreate();
    }

    return (
      <div>
        <ButtonRow>
          {COMMAND_KEYS.map((key, ci) => {
            const c = this.state[key];
            return (
              <CommandButton
                key={'command-'+c.key}
                command={c}
                callback={key => this.setFocus(key)}
                onCreate={wrapCommandCreate}
                onEdit={onCommandEdit}
                onDelete={onCommandDelete}
                isFocused={focusIndex === c.key}
              />
            );
          })}
        </ButtonRow>
        <UrlContainer>
          <a href={shareUrl}>Share this config</a>
        </UrlContainer>
      </div>
    );
  }
}
