import defaultTheme from 'src/client/themes/default';

type CustomDefautlTheme = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomDefautlTheme {}
}
