import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Routes />
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
