import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { withCookies, CookiesProvider } from 'react-cookie';

import Beta from './Beta';
import Legacy from './Legacy';

const render = app => {
  const CookieApp = withCookies(app);
  ReactDOM.render(
    <CookiesProvider>
      <CookieApp />
    </CookiesProvider>,
    document.getElementById('root')
  );
}

const selector = window.location.search;
if (selector.includes('beta')){
  render(Beta);
} else if (selector.includes('legacy')){
  render(Legacy);
} else {
  render(Beta);
}
