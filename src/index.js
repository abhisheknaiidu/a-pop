import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core'
import theme from './theme'

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
 document.getElementById('root')
);

