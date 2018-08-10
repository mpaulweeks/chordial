import React, { Component } from 'react';

import { getAllKeys } from '../audio/Type';
import {
  SelectSectionContainer,
  SectionHeader,
} from './Common';
import {
  OptionRow,
  OptionButton,
} from './Option';

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
    const rawRootKey = (currentRootKey + 12000) % 12;
    return (
      <SelectSectionContainer>
        <SectionHeader> Select Key </SectionHeader>
        <OptionRow>
          {allKeys.map((ak, aki) => (
            <OptionButton
              key={'root'+aki}
              value={ak.step}
              label={ak.letter}
              callback={setRootKey}
              isFocused={ak.step === rawRootKey}
            />
          ))}
        </OptionRow>
      </SelectSectionContainer>
    );
  }
}
