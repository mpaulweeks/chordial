import React, { Component } from 'react';

import { getAllKeys } from './audio/Type';
import DiatonicFunction, { majorFunctions, minorFunctions } from './audio/DiatonicFunction';

import CommandRow from './view/CommandRow';
import {
  DiatonicFunctionButton,
  ButtonRow,
} from './view/Component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      root: 0,
      functions: [],
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', event => {
      this.commandRow.handleKeyPress(event);
    });
    this.setRoot(0);
  }
  setRoot(root: number){
    const functions = [majorFunctions, minorFunctions].map(
      funcList => funcList.map(
        fc => new DiatonicFunction(root, fc)
      )
    );
    this.setState({
      root: root,
      functions: functions,
    })
  }
  setOctave(octave: number){
    const rawRoot = (this.state.root + 12000) % 12;
    this.setRoot(rawRoot + (octave * 12));
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
      functions,
    } = this.state
    const octaves = [-2, -1, 0, 1, 2];
    const allKeys = getAllKeys();
    return (
      <div>
        <CommandRow ref={(ref) => (this.commandRow = ref)}/>
        <select onChange={e => this.setRoot(parseFloat(e.target.value))}>
          {allKeys.map((ak, aki) => (
            <option key={'root'+aki} value={ak.step}>{ak.letter}</option>
          ))}
        </select>
        <select onChange={e => this.setOctave(parseFloat(e.target.value))}>
          {octaves.map((oct, octi) => (
            <option key={'oct'+octi} value={oct}>{oct + 4}</option>
          ))}
        </select>
        {functions.map((fl, fli) => (
          <ButtonRow key={'fl-' + fli}>
            {fl.map((df, dfi) => (
              <DiatonicFunctionButton key={'df-'+dfi} df={df} callback={this.onFunctionClick} />
            ))}
          </ButtonRow>
        ))}
      </div>
    );
  }
}

export default App;
