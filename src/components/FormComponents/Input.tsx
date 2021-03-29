import React from 'react';
import { Input as AntInput } from 'antd';

interface InputProps {
  fieldKey: string;
  handleChange: any;
  formData: any;
  type: string;
  label: string;
}

const Input = (props: InputProps) => {
  return (
    <>
      <p>{props.label}</p>
      <AntInput value={props.formData[props.fieldKey]} onChange={e => props.handleChange(e, props.fieldKey)} type={props.type} />
    </>
  )
};

export default Input