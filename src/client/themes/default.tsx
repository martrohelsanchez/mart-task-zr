/* eslint-disable no-magic-numbers */
import { rem, rgba } from 'polished';

const colors = {
  // brand colors
  teal1: '#2FECFC',
  teal2: '#0ABCC7',
  royalBlue: '#193B4E',

  // primary colors
  gray1: '#262626',
  gray2: '#71747D',
  gray3: '#F0F0F0',
  gray4: '#FFFFFF',
  gray5: '#11182C',

  // secondary colors
  blueGray: '#F8FBFD',

  // background
  white: '#FFFFFF',
  white_01: rgba('#FFFFFF', 0.1),

  // neutral
  neutral5: '#D9D9D9',
  neutral6: '#F0F0F0',

  //text
  darkHighEmphasis: '#11182C',
  darkLowEmphasis: rgba(0, 0, 0, 0.25),
  darkMedEmphasis: rgba(0, 0, 0, 0.6),
  lightMedEmphasis: rgba(255, 255, 255, 0.6),
  title85: rgba(0, 0, 0, 0.85),

  //border
  border1: rgba(0, 0, 0, 0.06),

  // extras
  black: '#000000',
  error: '#F36969',
  activeGradient:
    'linear-gradient(0deg, rgba(243, 109, 109, 0.72) 0%, rgba(243, 109, 109, 0) 100%)',
  inactiveGradient:
    'linear-gradient(0deg, #0abcc7 0%, rgba(10, 188, 199, 0) 100%)',
  cornSilk: '#FFFBE6',
  yellow: '#FFE58F',
  ExclamationCircleFilledColor: '#FAAD14',
  success: '#56C22D',
  warning: '#F8AC2F',
};

const fontFamilies = {
  playfair: "'Playfair Display', serif",
  regular: "'Spartan', sans-serif",
  roboto: 'Roboto, serif',
  secondary: "'TT Norms', sans-serif",
};

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const fontSizes = {
  h1: rem('72px'),
  h2: rem('64px'),
  h3: rem('48px'),
  h4: rem('36px'),
  h5: rem('30px'),
  subtitle1: rem('24px'),
  subtitle2: rem('18px'),
  body: rem('18px'),
  body2: rem('14px'),
  buttonSize: rem('14px'),
  overline: rem('14px'),
  caption1: rem('16px'),
  caption2: rem('12px'),
};

const shadows = {
  elevation1: '0px 2px 4px rgba(147, 156, 174, 0.24)',
  elevation2: '0px 4px 8px rgba(147, 156, 174, 0.24)',
  elevation3: '0px 8px 16px rgba(147, 156, 174, 0.24)',
  elevation4: '0 0 0 2px rgb(24 144 255 / 20%)',
  shadow2: '0px 2px 14px rgba(0, 0, 0, 0.03)',
  shadow3: '0px 7px 29px 0px rgba(100, 100, 111, 0.2) ',
};

const size = {
  mobileS: '320px',
  mobileM: '376px',
  mobileL: '426px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const extras = {
  maxWidth: '1440px',
};

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

const defaultTheme = {
  colors,
  device,
  extras,
  fontFamilies,
  fontSizes,
  fontWeights,
  size,
  shadows,
};

export default defaultTheme;
