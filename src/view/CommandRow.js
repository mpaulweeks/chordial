import React, { Component } from 'react';

import {
  CommandButton,
  ButtonRow,
} from './Component';

const COMMAND_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

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
    };
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
  loadDiatonicFunctions(dfs: Array<DiatonicFunction>){
    const newState = COMMAND_KEYS.reduce((map, key, index) => {
      map[key] = {
        ...this.state[key],
        df: dfs[index] || null,
      };
      return map;
    }, {});
    this.setState(newState, () => this.afterFunctionSet());
  }
  stepFocus(delta: number) {
    const { focusIndex } = this.state;
    const keysIndex = COMMAND_KEYS.indexOf(focusIndex);
    const commandIndex = (keysIndex + delta + COMMAND_KEYS.length) % COMMAND_KEYS.length;
    this.setFocus(COMMAND_KEYS[commandIndex]);
  }
  setFocus = (key: string) => {
    this.setState({
      focusIndex: key,
    }, () => {
      this.playCurrent();
    });
  }
  setDiatonicFunction(df: DiatonicFunction) {
    const { focusIndex } = this.state;
    const newState = {};
    newState[focusIndex] = {
      ...this.state[focusIndex],
      df: df,
    };
    this.setState(newState, () => this.afterFunctionSet());
  }
  afterFunctionSet() {
    const dfs = COMMAND_KEYS.reduce((arr, key) => {
      const df = this.state[key].df;
      if (df){
        arr.push(df);
      }
      return arr;
    }, []);
    this.props.onCommandUpdate(dfs);
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
  render() {
    const {
      focusIndex,
    } = this.state;

    return (
      <ButtonRow>
        {COMMAND_KEYS.map((key, ci) => {
          const c = this.state[key];
          return (
            <CommandButton
              key={'command-'+c.key}
              command={c}
              callback={this.setFocus}
              isFocused={focusIndex === c.key}
            />
          );
        })}
      </ButtonRow>
    );
  }
}
