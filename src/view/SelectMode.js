import React, { Component } from 'react';

import { toOption, keyModes } from '../audio/Type';
import {
  OptionRow,
  SelectSectionContainer,
  SelectSectionHeader,
  OptionButton,
} from './Component';

export default class SelectMode extends Component {
  constructor(props){
    super(props);
    this.state = {
      modeOptions: toOption(keyModes),
    };
  }
  componentDidMount() {
    this.props.setMode(keyModes.major);
  }
  render() {
    const {
      currentMode,
      setMode,
    } = this.props;
    const {
      modeOptions,
    } = this.state;
    return (
      <SelectSectionContainer>
        <SelectSectionHeader> Select Mode </SelectSectionHeader>
        <OptionRow>
          {modeOptions.map((opt, opti) => (
            <OptionButton
              key={'mode'+opti}
              value={opt.value}
              label={opt.label}
              callback={setMode}
              isFocused={opt.value === currentMode}
            />
          ))}
        </OptionRow>
      </SelectSectionContainer>
    );
  }
}
