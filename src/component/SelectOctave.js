import React, { Component } from 'react';

import {
  SelectSectionContainer,
  SectionHeader,
} from './Common';
import {
  OptionRow,
  OptionButton,
} from './Option';

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
        <SectionHeader> Select Octave </SectionHeader>
        <OptionRow>
          {octaves.map((oct, octi) => (
            <OptionButton
              key={'octave'+octi}
              value={oct}
              label={oct}
              callback={setOctave}
              isFocused={oct === currentOctave}
            />
          ))}
        </OptionRow>
      </SelectSectionContainer>
    );
  }
}
