import styled from 'styled-components';

import {
  BODY,
  BODY_2_MEDIUM,
  BODY_2_REGULAR,
  BODY_ITALIC,
  BUTTON_MEDIUM,
  BUTTON_REGULAR,
  CAPTION1,
  CAPTION2,
  CAPTION3,
  CAPTION4,
  CAPTION5,
  H1,
  H2,
  H3,
  H4,
  H5,
  OVERLINE,
  SUBTITLE1,
  SUBTITLE2,
} from 'src/client/constants/text';
import { TextType } from 'src/client/types/Text';

type TextProps = {
  color?: string;
  type: TextType;
  isInline: boolean;
};

export const StyledText = styled.p<TextProps>`
  display: ${(props) => (props.isInline ? 'inline' : 'block')};
  margin: 0;
  color: ${(props) => props.color};

  ${(props) => props.type === 'h1' && H1}
  ${(props) => props.type === 'h2' && H2}
  ${(props) => props.type === 'h3' && H3}
  ${(props) => props.type === 'h4' && H4}
  ${(props) => props.type === 'h5' && H5}
  ${(props) => props.type === 'subtitle1' && SUBTITLE1}
  ${(props) => props.type === 'subtitle2' && SUBTITLE2}
  ${(props) => props.type === 'body' && BODY}
  ${(props) => props.type === 'bodyItalic' && BODY_ITALIC} 
  ${(props) => props.type === 'buttonMedium' && BUTTON_MEDIUM}
  ${(props) => props.type === 'buttonRegular' && BUTTON_REGULAR}
  ${(props) => props.type === 'overline' && OVERLINE}
  ${(props) => props.type === 'caption1' && CAPTION1}
  ${(props) => props.type === 'caption2' && CAPTION2} 
  ${(props) => props.type === 'caption3' && CAPTION3}
  ${(props) => props.type === 'caption4' && CAPTION4}
  ${(props) => props.type === 'caption5' && CAPTION5}
  ${(props) => props.type === 'body2Regular' && BODY_2_REGULAR}
  ${(props) => props.type === 'body2Medium' && BODY_2_MEDIUM}
`;
