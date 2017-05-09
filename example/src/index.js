import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Hello from './Hello';


const load = () => render((
  <AppContainer>
    <Hello name="World" />
  </AppContainer>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./Hello', load);
}

load();
