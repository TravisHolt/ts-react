import React from 'react';
import { Select as AntSelect } from 'antd';

const { Option } = AntSelect;

interface Option {
  label: string;
  value: string | number;
}

interface ISelectProps {
  label: string;
  handleChange: Function;
  options: Option[];
  fieldKey: string;
}

const Select = (props: ISelectProps) => {
  return (
    <>
      <p> {props.label} </p>
      <AntSelect onChange={val => props.handleChange(val, props.fieldKey)} style={{ width: '100%' }}>
        {props.options.map(o => (
          <Option value={o.value}>{o.label}</Option>
        ))}
      </AntSelect>
    </>
  )
};

export default Select;