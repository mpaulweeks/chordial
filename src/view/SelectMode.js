import React, { Component } from 'react';

import { toOption, keyModes } from '../audio/Type';
import {
  ButtonRow,
  SelectSectionContainer,
  SelectSectionHeader,
  OptionButton,
} from './Component';

export default class SelectKey extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyModes: toOption(keyModes),
    };
  }
  componentDidMount() {
    this.props.setMode(this.state.keyModes[0].value);
  }
  render() {
    const {
      currentMode,
      setMode,
    } = this.props;
    const {
      keyModes,
    } = this.state;
    return (
      <SelectSectionContainer>
        <SelectSectionHeader> Select Mode </SelectSectionHeader>
        <ButtonRow>
          {keyModes.map((km, kmi) => (
            <OptionButton
              key={'mode'+kmi}
              value={km.value}
              label={km.label}
              callback={setMode}
              isFocused={km.value === currentMode}
            />
          ))}
        </ButtonRow>
      </SelectSectionContainer>
    );
  }
}
