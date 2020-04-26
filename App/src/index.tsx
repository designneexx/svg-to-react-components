import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '@material-ui/styles';
import { StoreProvider } from './store/StoreProvider';
import { AppProvider } from './AppProvider';

export const App: FC = () => {
  console.log('Top level');
  return (
    <React.StrictMode>
      <BrowserRouter>
        <StoreProvider>
          <StylesProvider injectFirst>
            <AppProvider />
          </StylesProvider>
        </StoreProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
