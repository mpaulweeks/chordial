import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Beta from './Beta';
import Legacy from './Legacy';

const rootElm = document.getElementById('root');
const selector = window.location.search;
if (selector.includes('beta')){
  ReactDOM.render(<Beta/>, rootElm);
} else if (selector.includes('legacy')){
  ReactDOM.render(<Legacy/>, rootElm);
} else {
  ReactDOM.render(<Legacy/>, rootElm);
}
