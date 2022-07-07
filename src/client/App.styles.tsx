import { rem } from 'polished';
import { createGlobalStyle } from 'styled-components';

import defaultTheme from './themes/default';

type DefaultThemeProps = typeof defaultTheme;

type ThemeProps = {
  theme: DefaultThemeProps;
};

export default createGlobalStyle<ThemeProps>`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 100%;
    font-family: ${(props) => props.theme.fontFamilies.regular};
    scroll-behavior: smooth;
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizes.h1};
    line-height: ${(props) => props.theme.fontSizes.h1};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes.h2};
    line-height: ${(props) => props.theme.fontSizes.h2};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizes.h3};
    line-height: ${(props) => props.theme.fontSizes.h3};
  }

  h4 {
    font-size: ${(props) => props.theme.fontSizes.h4};
    line-height: ${(props) => props.theme.fontSizes.h4};
  }

  h5 {
    font-size: ${(props) => props.theme.fontSizes.h5};
    line-height: ${(props) => props.theme.fontSizes.h5};
  }

  body {
    font-size: ${(props) => props.theme.fontSizes.body};
    line-height: ${rem('20px')};
  }

  a {
    color: ${(props) => props.theme.colors.teal2};
  }

  .ant-dropdown-menu {
    max-height: 500px;
    overflow: auto;
  }
`;
