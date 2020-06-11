import React from 'react';
//import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, history } from './redux/store'
import Routes from './router'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// import { purple } from '@material-ui/core/colors';
// import Button from '@material-ui/core/Button';
import { SnackbarProvider } from 'notistack';
import "react-datepicker/dist/react-datepicker.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#4B8D3A',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#57595C',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <BrowserRouter>
            <Provider store={store}>
              <Routes history={history} />
            </Provider>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
