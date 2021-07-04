import React from 'react';
import { Global, css } from '@emotion/react';

export const GlobalStyle = (): JSX.Element => (
  <Global
    styles={css`
      html {
        font-family: sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
      body {
        margin: 0;
        font-family: "Roboto","HelveticaNeue","Helvetica Neue",sans-serif;
        background-color: #E5E5E5;
      }
    `}
  />
);
