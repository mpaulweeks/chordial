import React, { Component } from 'react';

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
    const root = 0;
    this.functions = [majorFunctions, minorFunctions].map(
      funcList => funcList.map(
        fc => new DiatonicFunction(root, fc)
      )
    );
  }
  componentDidMount() {
    document.addEventListener('keydown', event => {
      this.commandRow.handleKeyPress(event);
    });
  }
  stopAll = () => {
    this.functions.forEach(
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
    } = this;
    return (
      <div>
        <MidiLoader />
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
