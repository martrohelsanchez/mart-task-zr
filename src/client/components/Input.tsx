import { Input as AntdInput } from 'antd';
import React from 'react';
import styled, { css } from 'styled-components';

type InputProps = React.ComponentProps<typeof AntdInput>;
type PasswordProps = React.ComponentProps<typeof AntdInput.Password>;
type TextAreaProps = React.ComponentProps<typeof AntdInput.TextArea>;

function Input(props: InputProps) {
  return <StyledInput {...props} />;
}

function Password(props: PasswordProps) {
  return <StyledInputPassword {...props} />;
}

function TextArea(props: TextAreaProps) {
  return <StyledTextArea {...props} />;
}

Input.Password = Password;
Input.TextArea = TextArea;
Input.Group = AntdInput.Group;

const style = css`
  padding: 14px 22px;
  border-radius: 8px;
`;

const StyledInputPassword = styled(AntdInput.Password)`
  ${style}
`;

const StyledInput = styled(AntdInput)`
  ${style}
`;

const StyledTextArea = styled(AntdInput.TextArea)`
  ${style}
`;

export default Input;
