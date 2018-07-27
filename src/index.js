import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Beta from './Beta';
import Legacy from './Legacy';

const rootElm = document.getElementById('root');
if (window.location.search.includes('beta')){
  ReactDOM.render(<Beta/>, rootElm);
} else {
  ReactDOM.render(<Legacy/>, rootElm);
}
