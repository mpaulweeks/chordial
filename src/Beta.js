import React, { Component } from 'react';
import styled from 'styled-components';

import type {
  KeyMode,
  Inversion,
} from './audio/Type';
import {
  keyModes,
  inversions,
} from './audio/Type';
import Preset from './audio/Preset';
import DiatonicFunction, { majorFunctions, minorFunctions } from './audio/DiatonicFunction';

import CommandRow from './view/CommandRow';
import SelectMode from './view/SelectMode';
import SelectInversion from './view/SelectInversion';
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
      mode: keyModes.major,
      octave: 0,
      inversion: inversions.none,
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
    const {
      rootKey,
      mode,
      inversion,
      octave,
    } = this.state;
    const rootStep = rootKey + (12*octave);
    let baseFunctions = [];
    switch (mode){
      case keyModes.major:
        baseFunctions = majorFunctions;
        break;
      case keyModes.minor:
        baseFunctions = minorFunctions;
        break;
      default:
        throw Error('unsupported mode: ' + mode);
    }
    this.setState({
      functions: baseFunctions.map(
        fc => new DiatonicFunction(rootStep, fc, inversion)
      ),
    })
  }
  setRootKey = (rootKey: number) => {
    this.setState({
      rootKey: rootKey,
    }, this.reloadFunctions);
  }
  setMode = (mode: KeyMode) => {
    this.setState({
      mode: mode,
    }, this.reloadFunctions);
  }
  setInversion = (inversion: Inversion) => {
    this.setState({
      inversion: inversion,
    }, this.reloadFunctions);
  }
  setOctave = (octave: number) => {
    this.setState({
      octave: octave,
    }, this.reloadFunctions);
  }
  stopAll = () => {
    this.state.functions.forEach(df => df.chord.stop());
  }
  onFunctionClick = (df: DiatonicFunction) => {
    this.stopAll();
    df.chord.play(0, 1);
    this.commandRow.setDiatonicFunction(df);
  }
  render() {
    const {
      rootKey,
      mode,
      inversion,
      octave,
      functions,
    } = this.state
    return (
      <Beta>
        <CommandRow ref={(ref) => (this.commandRow = ref)}/>
        <SelectContainer>
          <SelectKey currentRootKey={rootKey} setRootKey={this.setRootKey} />
        </SelectContainer>
        <SelectContainer>
          <SelectMode currentMode={mode} setMode={this.setMode} />
          <SelectInversion currentInversion={inversion} setInversion={this.setInversion} />
          <SelectOctave currentOctave={octave} setOctave={this.setOctave} />
        </SelectContainer>

        <ButtonRow>
          {functions.map((df, dfi) => (
            <DiatonicFunctionButton key={'df-'+dfi} df={df} callback={this.onFunctionClick} />
          ))}
        </ButtonRow>
      </Beta>
    );
  }
}

export default App;
