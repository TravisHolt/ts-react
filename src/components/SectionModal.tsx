import React from 'react';
import { Input, Modal } from 'antd';
import { NewSection } from './FormGenerator';

interface SectionProps {
  toggleSectionModal: Function;
  sectionModal: boolean;
  submitSectionModal: any;
  newSection: NewSection;
  configureSection: Function;
}

const SectionModal = ({
  toggleSectionModal,
  sectionModal,
  submitSectionModal,
  newSection,
  configureSection
}: SectionProps) => {
  return (
    <Modal onCancel={() => toggleSectionModal(false)} visible={sectionModal} onOk={submitSectionModal}>
      <p> Section Label </p>
      <Input
        value={newSection.title}
        onChange={e => configureSection(e, 'title')}
        style={{ width: '200px' }}
      />
      <p> Section Storage Label </p>
      <Input
        value={newSection.id}
        onChange={e => configureSection(e, 'id')}
        style={{ width: '200px' }}
      />
    </Modal>

  )
};

export default SectionModal;