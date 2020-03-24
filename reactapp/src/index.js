import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import theme from "./theme";

import * as serviceWorker from './serviceWorker';

import {ThemeProvider, createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
     body{
         background-color:${theme.bg};
         margin: 0;
         padding: 0;
     }
`;

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.Fragment>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
