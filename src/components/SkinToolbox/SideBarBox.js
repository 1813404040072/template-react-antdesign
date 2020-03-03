import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const SideBarBox = ({ theme, onChange }) => (
  <RadioGroup
    onChange={onChange}
    value={theme.leftSide}
  >
    <RadioButton value="light">
      <img src="/images/theme-light.png" alt="Theme Light" />
    </RadioButton>
    <RadioButton value="normal">
      <img src="/images/theme-normal.png" alt="Theme Normal" />
    </RadioButton>
    <RadioButton value="dark">
      <img src="/images/theme-dark.png" alt="Theme Dark" />
    </RadioButton>
  </RadioGroup>
);

SideBarBox.propTypes = {
  theme: PropTypes.object,
  onChange: PropTypes.func
};

export default SideBarBox;
