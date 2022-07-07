import React from 'react';

import { TextType } from 'src/client/types/Text';

import { StyledText } from './styles';

type Props = {
  [index: string]: any;
  type?: TextType;
  children: React.ReactNode | React.ReactNodeArray;
  className?: string;
  color?: string;
  isInline?: boolean;
};

export default function Text(props: Props) {
  const { type = 'p', children, color, isInline = false, ...extras } = props;

  return (
    <StyledText {...extras} color={color} isInline={isInline} type={type}>
      {children}
    </StyledText>
  );
}
