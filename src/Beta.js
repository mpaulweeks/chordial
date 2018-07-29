import React, { Component } from 'react';
import styled from 'styled-components';

import Preset from './audio/Preset';
import DiatonicFunction, { majorFunctions, minorFunctions } from './audio/DiatonicFunction';

import CommandRow from './view/CommandRow';
import SelectKey from './view/SelectKey';
import SelectOctave from './view/SelectOctave';
import {
  DiatonicFunctionButton,
  SelectContainer,
  ButtonRow,
} from './view/Component';

const Beta = styled.div`
  text-align: center;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      rootKey: 0,
      octave: 0,
      functions: [],
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', event => {
      this.commandRow.handleKeyPress(event);
    });
    this.commandRow.loadDiatonicFunctions(Preset.dfs);
  }
  reloadFunctions() {
    const rootStep = this.state.rootKey + (12*this.state.octave);
    const functions = [majorFunctions, minorFunctions].map(
      funcList => funcList.map(
        fc => new DiatonicFunction(rootStep, fc)
      )
    );
    this.setState({
      functions: functions,
    })
  }
  setRootKey = (rootKey: number) => {
    this.setState({
      rootKey: rootKey,
    }, this.reloadFunctions);
  }
  setOctave = (octave: number) => {
    this.setState({
      octave: octave,
    }, this.reloadFunctions);
  }
  stopAll = () => {
    this.state.functions.forEach(
      fl => fl.forEach(
        df => df.chord.stop()
      )
    );
  }
  onFunctionClick = (df: DiatonicFunction) => {
    this.stopAll();
    df.chord.play(0, 1);
    this.commandRow.setDiatonicFunction(df);
  }
  render() {
    const {
      rootKey,
      octave,
      functions,
    } = this.state
    return (
      <Beta>
        <CommandRow ref={(ref) => (this.commandRow = ref)}/>
        <SelectContainer>
          <SelectKey currentRootKey={rootKey} setRootKey={this.setRootKey} />
          <SelectOctave currentOctave={octave} setOctave={this.setOctave} />
        </SelectContainer>

        {functions.map((fl, fli) => (
          <ButtonRow key={'fl-' + fli}>
            {fl.map((df, dfi) => (
              <DiatonicFunctionButton key={'df-'+dfi} df={df} callback={this.onFunctionClick} />
            ))}
          </ButtonRow>
        ))}
      </Beta>
    );
  }
}

export default App;
