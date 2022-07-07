import {
  render as renderComponent,
  RenderOptions,
} from '@testing-library/react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from '../themes/default';

import { ReactQueryWrapper } from './wrappers';

const history = createBrowserHistory();

export function render(component: React.ReactNode, options?: RenderOptions) {
  return renderComponent(
    <Router history={history}>
      <ReactQueryWrapper>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </ReactQueryWrapper>
    </Router>,
    options
  );
}
