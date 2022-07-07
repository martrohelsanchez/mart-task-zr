import { Button } from 'antd';
import styled from 'styled-components';

import { BUTTON_MEDIUM } from 'src/client/constants/text';

export const StyledButton = styled(Button)`
  padding: 15px 16px;
  height: fit-content;
  border-radius: 8px;
  ${BUTTON_MEDIUM}

  &.ant-btn.ant-btn-primary:not(.ant-btn-dangerous) {
    background: ${(props) => props.theme.colors.teal2};
    border-color: ${(props) => props.theme.colors.teal2};
  }

  &.ant-btn-secondary {
    background: ${(props) => props.theme.colors.royalBlue};
    border-color: ${(props) => props.theme.colors.royalBlue};
  }

  &.ant-btn-secondary:hover,
  &.ant-btn-secondary:focus {
    color: ${(props) => props.theme.colors.teal1};
    outline-color: ${(props) => props.theme.colors.teal1};
  }

  &.ant-btn-lg,
  &.ant-btn {
    padding: 15px 24px;
    line-height: 1;
  }

  &.ant-btn-lg {
    padding: 16px 24px;
  }

  &.ant-btn-sm {
    padding: 8px 10px;
  }

  &.ant-btn.ant-btn-primary:not(.ant-btn-dangerous).ant-btn-background-ghost
    span {
    color: ${(props) => props.theme.colors.teal2};
  }

  &.ant-btn-link {
    color: black;
  }
`;

export const TextAccentButton = styled(Button).attrs(() => ({
  type: 'text',
}))`
  color: ${(props) => props.theme.colors.teal2};

  &:hover {
    color: ${(props) => props.theme.colors.teal2};
  }
`;
