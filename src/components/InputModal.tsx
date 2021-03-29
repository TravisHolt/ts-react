import React from 'react';
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
  return (
    <Modal onOk={submitModal} onCancel={() => toggleVisible(false)} visible={modalVisible}>
      <h1> Add Field to {selectedSection} </h1>
      <p> Field Type</p>
      <Select value={newField.type} style={{ width: '200px' }} onChange={value => handleNewFieldState('type', value)}>
        <Option value='Input'> Input </Option>
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
    </Modal>
  );
}

export default InputModal;