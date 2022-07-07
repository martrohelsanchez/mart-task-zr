import { TimePicker as AntdTimePicker } from 'antd';
import React from 'react';

import styled from 'styled-components';

type Props = React.ComponentProps<typeof AntdTimePicker>;

function TimePicker(props: Props) {
  return <StyledTimePicker {...props} />;
}

const StyledTimePicker = styled(AntdTimePicker)`
  padding: 14px 22px;
  width: 100%;
  border-radius: 8px;
`;

export default TimePicker;
