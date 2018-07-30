import React, { Component } from 'react';

import { toOption, inversions } from '../audio/Type';
import {
  OptionRow,
  SelectSectionContainer,
  SelectSectionHeader,
  OptionButton,
} from './Component';

export default class SelectInversion extends Component {
  constructor(props){
    super(props);
    this.state = {
      inversionOptions: toOption(inversions),
    };
  }
  componentDidMount() {
    this.props.setInversion(inversions.none);
  }
  render() {
    const {
      currentInversion,
      setInversion,
    } = this.props;
    const {
      inversionOptions,
    } = this.state;
    return (
      <SelectSectionContainer>
        <SelectSectionHeader> Select Inversion </SelectSectionHeader>
        <OptionRow>
          {inversionOptions.map((opt, opti) => (
            <OptionButton
              key={'inversion'+opti}
              value={opt.value}
              label={opt.label}
              callback={setInversion}
              isFocused={opt.value === currentInversion}
            />
          ))}
        </OptionRow>
      </SelectSectionContainer>
    );
  }
}
