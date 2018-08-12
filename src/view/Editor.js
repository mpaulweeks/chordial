import React, { Component } from 'react';

import type {
  KeyMode,
  Inversion,
} from '../audio/Type';
import {
  keyModes,
  inversions,
} from '../audio/Type';
import DiatonicFunction, { majorFunctions, minorFunctions } from '../audio/DiatonicFunction';

import SelectMode from '../component/SelectMode';
import SelectInversion from '../component/SelectInversion';
import SelectKey from '../component/SelectKey';
import SelectOctave from '../component/SelectOctave';
import Modal from '../component/Modal';
import { DiatonicFunctionButton } from '../component/Playable';
import {
  SelectContainer,
  SectionHeader,
  ButtonRow,
  BigButton,
} from '../component/Common';

export default class EditorApp extends Component {
  constructor() {
    super();
    this.state = {
      rootKey: 0,
      mode: keyModes.major,
      octave: 0,
      inversion: inversions.none,
      functions: [],
      focusIndex: 0,
    }
  }
  handleKeyPress(event) {
    const key = event.key.toLowerCase();

    if (key === 'escape'){
      this.props.closeModal();
    }
    if (key === 'arrowleft'){
      this.stepFocus(-1);
    }
    if (key === 'arrowright'){
      this.stepFocus(1);
    }
    if (key === ' '){
      this.playCurrent();
      event.preventDefault();
    }
  }
  reloadFunctions() {
    const {
      mode,
      rootKey,
      inversion,
      octave,
      focusIndex,
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
    const newFocusIndex = Math.min(focusIndex, newFunctions.length - 1);
    this.setState({
      functions: newFunctions,
    }, () => this.setFocus(newFocusIndex));
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
  setDefaults = (df: DiatonicFunction) => {
    this.setState({
      rootKey: df.config.tonic,
      inversion: df.config.inversion,
      octave: df.config.octave,
    }, this.reloadFunctions);
  }
  stopAll = () => {
    this.state.functions.forEach(df => df.chord.stop());
  }
  stepFocus(delta: number) {
    const { functions, focusIndex } = this.state;
    const newIndex = (functions.length + focusIndex + delta) % functions.length;
    this.setFocus(newIndex);
  }
  setFocus(index: number, mute?: boolean) {
    this.setState({
      focusIndex: index,
    }, () => {
      if (!mute){
        this.playCurrent();
      }
    });
  }
  playCurrent(){
    const current = this.getFocus();
    if (current){
      current.chord.stop();
      current.chord.play(0, 1);
    }
  }
  getFocus =  () => {
    const { functions, focusIndex } = this.state;
    return focusIndex < functions.length ? functions[focusIndex] : null;
  }
  onFunctionClick = (index: number, df: DiatonicFunction) => {
    this.stopAll();
    df.chord.play(0, 1);
    this.setState({
      focusIndex: index,
    });
  }
  onSaveClick = () => {
    const focused = this.getFocus();
    if (focused) {
      this.props.onFunctionSet(focused);
      this.props.closeModal();
    }
  }
  render() {
    const {
      rootKey,
      mode,
      inversion,
      octave,
      functions,
      focusIndex,
    } = this.state;
    const {
      modalOpen,
    } = this.props;
    return (
      <Modal modalOpen={modalOpen} onExit={this.props.closeModal}>
        <SelectContainer>
          <SelectKey currentRootKey={rootKey} setRootKey={this.setRootKey} />
        </SelectContainer>
        <SelectContainer>
          <SelectMode currentMode={mode} setMode={this.setMode} />
          <SelectInversion currentInversion={inversion} setInversion={this.setInversion} />
          <SelectOctave currentOctave={octave} setOctave={this.setOctave} />
        </SelectContainer>

        <SectionHeader> Test Chord </SectionHeader>
        <ButtonRow>
          {functions.map((df, dfi) => (
            <DiatonicFunctionButton
              key={'df-'+dfi}
              df={df}
              isFocused={focusIndex === dfi}
              callback={df => this.onFunctionClick(dfi, df)}
            />
          ))}
        </ButtonRow>

        <ButtonRow>
          <BigButton onClick={this.onSaveClick}>
            Set Chord
          </BigButton>
        </ButtonRow>
      </Modal>
    );
  }
}
