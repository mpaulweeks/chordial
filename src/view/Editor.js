import React, { Component } from 'react';
import styled from 'styled-components';

import type {
  KeyMode,
  Inversion,
} from '../audio/Type';
import {
  keyModes,
  inversions,
} from '../audio/Type';
import DiatonicFunction, { majorFunctions, minorFunctions } from '../audio/DiatonicFunction';

import SelectMode from './SelectMode';
import SelectInversion from './SelectInversion';
import SelectKey from './SelectKey';
import SelectOctave from './SelectOctave';
import {
  DiatonicFunctionButton,
  SelectContainer,
  SelectSectionHeader,
  ButtonRow,
} from './Component';

const EditorContainer = styled.div`
  text-align: center;
`;

class EditorApp extends Component {
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
  reloadFunctions() {
    const {
      mode,
      rootKey,
      inversion,
      octave,
    } = this.state;
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
    const newFunctions = baseFunctions.map(fc => {
      const mergedConfig = {
        ...fc,
        tonic: rootKey,
        octave: octave,
        inversion: inversion,
      };
      return DiatonicFunction.fromRoughConfig(mergedConfig);
    });
    this.setState({
      functions: newFunctions,
    });
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
    this.props.onFunctionClick(df);
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
      <EditorContainer>

        <SelectContainer>
          <SelectKey currentRootKey={rootKey} setRootKey={this.setRootKey} />
        </SelectContainer>
        <SelectContainer>
          <SelectMode currentMode={mode} setMode={this.setMode} />
          <SelectInversion currentInversion={inversion} setInversion={this.setInversion} />
          <SelectOctave currentOctave={octave} setOctave={this.setOctave} />
        </SelectContainer>

        <SelectSectionHeader> Add a Chord </SelectSectionHeader>
        <ButtonRow>
          {functions.map((df, dfi) => (
            <DiatonicFunctionButton key={'df-'+dfi} df={df} callback={this.onFunctionClick} />
          ))}
        </ButtonRow>

      </EditorContainer>
    );
  }
}

export default EditorApp;
