import React, { Component } from 'react';

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
      octaves: [2, 3, 4, 5, 6],
    };
  }
  componentDidMount() {
    this.props.setOctave(4);
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
              label={oct}
              callback={setOctave}
              isFocused={oct === currentOctave}
            />
          ))}
        </ButtonRow>
      </SelectSectionContainer>
    );
  }
}
