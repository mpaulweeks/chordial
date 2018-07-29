import React, { Component } from 'react';
import styled from 'styled-components';

import type { KeyMode } from './audio/Type';
import {
  keyModes,
} from './audio/Type';
import Preset from './audio/Preset';
import DiatonicFunction, { majorFunctions, minorFunctions } from './audio/DiatonicFunction';

import CommandRow from './view/CommandRow';
import SelectMode from './view/SelectMode';
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
      mode: keyModes.major,
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
      octave,
      mode,
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
        fc => new DiatonicFunction(rootStep, fc)
      ),
    })
  }
  setMode = (mode: KeyMode) => {
    this.setState({
      mode: mode,
    }, this.reloadFunctions);
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
      mode,
      rootKey,
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
