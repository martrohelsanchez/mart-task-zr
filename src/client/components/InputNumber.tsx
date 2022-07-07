import { InputNumber as AntdInputNumber } from 'antd';
import React from 'react';
import styled from 'styled-components';

type Props = React.ComponentProps<typeof AntdInputNumber>;

function InputNumber(props: Props) {
  return <StyledInputNumber controls={false} {...props} />;
}

const StyledInputNumber = styled(AntdInputNumber)`
  padding: 14px 22px;
  width: 100%;
  border-radius: 8px;

  .ant-input-number {
    padding: 0;
  }

  .ant-input-number-input {
    height: fit-content;
  }
`;

export default InputNumber;
