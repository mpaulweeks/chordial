import React, { Component } from 'react';

import {
  CommandButton,
  ButtonRow,
} from './Component';

const COMMAND_KEYS = ['1', '2', '3', '4', '5'] //, '6', '7', '8', '9', '0'];

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
      this.setState({
        focusIndex: key,
      });
    }
    if (key === 'arrowleft'){
      this.stepFocus(-1);
    }
    if (key === 'arrowright'){
      this.stepFocus(1);
    }
    if (['backspace', 'delete'].includes(key)){
      // delete df
    }
  }
  stepFocus(delta: number) {
    const { focusIndex } = this.state;
    const oldNum = parseFloat(focusIndex);
    const newNum = (oldNum + delta + COMMAND_KEYS.length) % COMMAND_KEYS.length;
    this.setState({
      focusIndex: '' + newNum,
    });
  }
  setFocus(key: string) {
    console.log('setting focus', key);
    this.setState({
      focusIndex: key,
    })
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
              onClick={() => this.setFocus(c.key)}
              isFocused={focusIndex === c.key}
            />
          );
        })}
      </ButtonRow>
    );
  }
}
