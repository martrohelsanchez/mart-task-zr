import { ButtonProps } from 'antd';
import React from 'react';

import { StyledButton, TextAccentButton } from './styles';

type Props = Omit<ButtonProps, 'size' | 'type'> & {
  as?: any;
  size?: any;
  to?: any;
  type?:
    | 'link'
    | 'text'
    | 'textAccent'
    | 'default'
    | 'secondary'
    | 'ghost'
    | 'dashed'
    | 'primary'
    | undefined;
};

export default function Button(props: Props) {
  const { children, ...remainingProps } = props;

  if (remainingProps.type === 'textAccent') {
    return <TextAccentButton {...remainingProps}>{children}</TextAccentButton>;
  }

  return <StyledButton {...remainingProps}>{children}</StyledButton>;
}
