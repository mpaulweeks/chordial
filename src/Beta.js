import React, { Component } from 'react';

import { allKeys } from './audio/Type';
import DiatonicFunction, { majorFunctions, minorFunctions } from './audio/DiatonicFunction';

import MidiLoader from './view/MidiLoader';
import CommandRow from './view/CommandRow';
import {
  DiatonicFunctionButton,
  ButtonRow,
} from './view/Component';

class App extends Component {
  constructor() {
    super();
    this.state = {
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
      functions: functions,
    })
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
    } = this.state;
    return (
      <div>
        <MidiLoader />
        <select onChange={e => this.setRoot(parseFloat(e.target.value))}>
          {allKeys.map(ak => (
            <option value={ak.step}>{ak.letter}</option>
          ))}
        </select>
        <CommandRow ref={(ref) => (this.commandRow = ref)}/>
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
