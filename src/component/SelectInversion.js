import React, { Component } from 'react';

import { toOption, inversions } from '../audio/Type';
import {
  SelectSectionContainer,
  SectionHeader,
} from './Common';
import {
  OptionRow,
  OptionButton,
} from './Option';

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
        <SectionHeader> Select Inversion </SectionHeader>
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
