import { rem } from 'polished';
import { css } from 'styled-components';

export const H1 = css`
  font-size: ${(props) => props.theme.fontSizes.h1};
  line-height: ${(props) => props.theme.fontSizes.h1};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export const H2 = css`
  font-size: ${(props) => props.theme.fontSizes.h2};
  line-height: ${(props) => props.theme.fontSizes.h2};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const H3 = css`
  font-size: ${(props) => props.theme.fontSizes.h3};
  line-height: ${(props) => props.theme.fontSizes.h3};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const H4 = css`
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: 160%;
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export const H5 = css`
  font-size: ${(props) => props.theme.fontSizes.h5};
  line-height: ${(props) => props.theme.fontSizes.h5};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export const SUBTITLE1 = css`
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  line-height: ${rem('34px')};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export const SUBTITLE2 = css`
  font-size: ${(props) => props.theme.fontSizes.subtitle2};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  line-height: ${rem('20px')};
`;

export const BODY = css`
  font-size: ${(props) => props.theme.fontSizes.body};
  line-height: ${rem('20px')};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export const BODY_ITALIC = css`
  font-size: ${(props) => props.theme.fontSizes.body};
  line-height: ${rem('20px')};
  font-weight: ${(props) => props.theme.fontWeights.light};
`;

export const BUTTON_MEDIUM = css`
  font-size: ${(props) => props.theme.fontSizes.buttonSize};
  line-height: ${rem('22px')};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export const BUTTON_REGULAR = css`
  font-size: ${(props) => props.theme.fontSizes.buttonSize};
  line-height: ${rem('22px')};
`;

export const OVERLINE = css`
  font-size: ${(props) => props.theme.fontSizes.overline};
  line-height: ${rem('22px')};
  letter-spacing: 0.13em;
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const CAPTION1 = css`
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-size: ${(props) => props.theme.fontSizes.caption1};
  line-height: ${rem('27px')};
`;

export const CAPTION2 = css`
  font-size: ${(props) => props.theme.fontSizes.caption2};
  line-height: ${rem('27px')};
`;

export const CAPTION3 = css`
  font-size: ${(props) => props.theme.fontSizes.caption2};
  line-height: ${rem('18px')};
`;

export const CAPTION4 = css`
  font-family: ${(props) => props.theme.fontFamilies.secondary};
  font-size: ${(props) => props.theme.fontSizes.body};
  line-height: ${rem('21px')};
`;

export const CAPTION5 = css`
  font-family: ${(props) => props.theme.fontFamilies.secondary};
  font-size: ${(props) => props.theme.fontSizes.body};
  line-height: ${rem('21px')};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const BODY_2_REGULAR = css`
  font-size: ${(props) => props.theme.fontSizes.body2};
  line-height: ${rem('22px')};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const BODY_2_MEDIUM = css`
  font-size: ${(props) => props.theme.fontSizes.body2};
  line-height: ${rem('22px')};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
