import React, { Component } from 'react';

import {
  CommandButton,
  ButtonRow,
} from './Component';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default class CommandRow extends Component {
  constructor() {
    super();

    const commands = KEYS.map(key => {
      return {
        key: key,
        df: null,
      };
    });
    this.state = {
      commands: commands,
      focusIndex: 0,
    };
  }

  setFocus(key: number) {
    console.log('setting focus', key);
    let focusIndex = 0;
    this.commands.forEach((c, i) => {
      if (c.key === key){
        focusIndex = i;
      }
    });
    this.setState({
      focusIndex: focusIndex,
    })
  }
  render() {
    const {
      commands,
      focusIndex,
    } = this.state;
    return (
      <ButtonRow>
        {commands.map((command, ci) => (
          <CommandButton
            key={'command-'+ci}
            command={command}
            onClick={() => this.setFocus(command.key)}
            isFocused={ci === focusIndex}
          />
        ))}
      </ButtonRow>

    );
  }
}
