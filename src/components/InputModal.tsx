import React, { useState, useEffect } from 'react';
import { Select, Modal, Input } from 'antd';
import { NewField } from './FormGenerator';

const { Option } = Select;

interface ModalProps {
  submitModal: any;
  toggleVisible: Function;
  modalVisible: boolean;
  newField: NewField;
  selectedSection: string;
  handleNewFieldState: Function;
}

const InputModal = ({
  submitModal,
  toggleVisible,
  modalVisible,
  newField,
  selectedSection,
  handleNewFieldState,
}: ModalProps) => {
  const [inputType, setInputType] = useState<string>('input');
  const [optionCount, setCount] = useState<number>(0);
  const [options, setOptions] = useState<{label: string, value: string | number}[]>([]);

  const selectInput = (value: string) => {
    let inputFunction = 'handleInput';

    if (value === 'Input') {
      inputFunction = 'handleInput';
      setInputType('input');
    } else if (value === 'Select') {
      inputFunction = 'handleSelect';
      setInputType('select');
    }

    handleNewFieldState('type', value)
    handleNewFieldState('function', inputFunction)
  };

  const createOptions = (key:string, val: string, index: number) => {
    setOptions(state => {
      const newOption = { ...state[index], [key]: val };
      state.splice(index, 1, newOption);
      return state;
    });
  };

  useEffect(() => {
    handleNewFieldState('options', options);
  }, [options.length]);

  return (
    <Modal
      visible={modalVisible}
      onOk={() => {
        setOptions([]);
        setCount(0);
        submitModal();
      }}
      onCancel={() => toggleVisible(false)}
    >
      <h1> Add Field to {selectedSection} </h1>
      <p> Field Type</p>
      <Select style={{ width: '200px' }} onChange={selectInput}>
        <Option value='Input'> Input </Option>
        <Option value='Select'> Select </Option>
      </Select>
      <p> New Label </p>
      <Input
        value={newField.label}
        onChange={e => handleNewFieldState('label', e.target.value)}
        style={{ width: '200px' }}
      />
      <p> Storage Key </p>
      <Input
        value={newField.key}
        onChange={e => handleNewFieldState('key', e.target.value)}
        style={{ width: '200px' }}
      />
      { inputType === 'select' && (
        <>
          <p> Options Count </p>
          <Input value={optionCount} onChange={e =>{ +e.target.value > 0 ? setCount(+e.target.value) : setCount(0)}} type='number' />
          {
            Array.from(new Array(optionCount)).map((opts, index) => (
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <p> Label: </p>
                <Input onChange={e => createOptions('label', e.target.value, index)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <p> Value: </p>
                <Input onChange={e => createOptions('value', e.target.value, index)} />
              </div>
              </div>
            ))
          }
        </>
      )}
    </Modal>
  );
}

export default InputModal;