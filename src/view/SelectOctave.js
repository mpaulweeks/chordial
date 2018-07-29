import React, { Component } from 'react';

import { getAllKeys } from '../audio/Type';
import {
  ButtonRow,
  SelectSectionContainer,
  SelectSectionHeader,
  OptionButton,
} from './Component';

export default class SelectOctave extends Component {
  constructor(props){
    super(props);
    this.state = {
      octaves: [-2, -1, 0, 1, 2],
    };
  }
  componentDidMount() {
    this.props.setOctave(0);
  }
  render() {
    const {
      currentOctave,
      setOctave,
    } = this.props;
    const {
      octaves,
    } = this.state;
    return (
      <SelectSectionContainer>
        <SelectSectionHeader> Select Octave </SelectSectionHeader>
        <ButtonRow>
          {octaves.map((oct, octi) => (
            <OptionButton
              key={'octave'+octi}
              value={oct}
              label={oct + 4}
              callback={setOctave}
              isFocused={oct === currentOctave}
            />
          ))}
        </ButtonRow>
      </SelectSectionContainer>
    );
  }
}
