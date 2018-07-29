import React, { Component } from 'react';

import Preset from './audio/Preset';
import DiatonicFunction, { majorFunctions, minorFunctions } from './audio/DiatonicFunction';

import CommandRow from './view/CommandRow';
import SelectKey from './view/SelectKey';
import {
  DiatonicFunctionButton,
  ButtonRow,
} from './view/Component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rootKey: 0,
      functions: [],
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', event => {
      this.commandRow.handleKeyPress(event);
    });
    this.commandRow.loadDiatonicFunctions(Preset.dfs);
  }
  setRootKey = (rootKey: number) => {
    const functions = [majorFunctions, minorFunctions].map(
      funcList => funcList.map(
        fc => new DiatonicFunction(rootKey, fc)
      )
    );
    this.setState({
      rootKey: rootKey,
      functions: functions,
    })
  }
  setOctave(octave: number){
    const rawRoot = (this.state.rootKey + 12000) % 12;
    this.setRootKey(rawRoot + (octave * 12));
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
      functions,
    } = this.state
    const octaves = [-2, -1, 0, 1, 2];
    return (
      <div>
        <CommandRow ref={(ref) => (this.commandRow = ref)}/>
        <SelectKey currentRootKey={rootKey} setRootKey={this.setRootKey} />
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
