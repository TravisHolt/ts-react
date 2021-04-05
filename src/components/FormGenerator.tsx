import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Card, Button } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Input, Select } from './FormComponents';
import SectionModal from './SectionModal';
import InputModal from './InputModal';

const { localStorage } = window;

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  type?: string;
  fieldKey: string;
  function: string;
  options?: Option[]; 
}

interface Field {
  widget: string;
  props: Props;
  span: number;
}

export interface Section {
  title: string;
  fields: Field[]
  span: number;
  id?: string;
}

interface Schema {
  form_title: string;
  sections: Section[];
}

export interface NewField {
  type: string;
  label: string;
  key: string;
  function: string;
  options?: Option[];
}

interface Grid {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface NewSection {
  title: string;
  id: string;
}

type HandleNewFieldState = (fieldName: string, value: string) => void;


const componentMap = {
  'Input': Input,
  'Select': Select
}

function FormGenerator() {
  const [modalVisible, toggleVisible] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [editable, toggleEdit] = useState<boolean>(false);
  const [resizable, toggleResize] = useState<boolean>(false);
  const [sectionModal, toggleSectionModal] = useState<boolean>(false);
  const [formData, setData] = useState<any>({});
  const [newSection, setNewSection] = useState<NewSection>({
    title: '',
    id: ''
  });
  const [layout, updateLayout] = useState<Grid[]>([
    { i: 'a', x: 0, y: 0, w: 5, h: 4 },
    { i: 'b', x: 5, y: 0, w: 6, h: 8 },
  ]);
  const [newField, setNewField] = useState<NewField>({
    type: '',
    label: '',
    key: '',
    function: ''
  });
  const [schema, updateSchema] = useState<Schema | null>({
    form_title: "Dynamic Form Builder",
    sections: [
      {
        title: 'Random Information',
        span: 4,
        id: 'a',
        fields: [
          {
            widget: 'Input',
            span: 12,
            props: {
              label: 'First Input',
              function: 'handleInput',
              fieldKey: 'first_input'
            }
          },
          {
            widget: 'Select',
            span: 12,
            props: {
              options: [{ label: 'Test', value: 'test'}],
              label: 'Select',
              fieldKey: 'test',
              function: 'handleSelect',
            }
          }
        ],
      },
      {
        title: 'User Information',
        span: 6,
        id: 'b',
        fields: [
          {
            widget: 'Input',
            span: 12,
            props: {
              label: 'Name',
              fieldKey: 'name',
              function: 'handleInput',
            }
          },
          {
            widget: 'Input',
            span: 12,
            props: {
              label: 'Email',
              type: 'email',
              fieldKey: 'email',
              function: 'handleInput',
            }
          },
          {
            widget: 'Input',
            span: 12,
            props: {
              label: 'Password',
              type: 'password',
              fieldKey: 'password',
              function: 'handleInput',
            }
          }
        ]
      }
    ]
  });

  const addField = (label: string): void => {
    toggleVisible(true);
    setSelectedSection(label);
  };
      
  const submitModal = (): void => {
    if (schema) {
      let newSchema = { ...schema };
      const section = (schema.sections.findIndex(s => s.title === selectedSection));
      const constructField: Field = {
        widget: newField.type,
        span: 12,
        props: {
          options: newField.options || [],
          label: newField.label,
          fieldKey: newField.key,
          function: newField.function,
        }
      }

      newSchema.sections[section].fields = [...schema.sections[section].fields, constructField]
      updateSchema(newSchema);
      toggleVisible(false);
      setSelectedSection('');
      setNewField({ type: '', label: '', key: '', function: '', options: []});
    }
  };

  const submitSectionModal = () => {
    addSection({ title: newSection.title, span: 4, id: newSection.id })
    setNewSection({ title: '', id: '' });
    toggleSectionModal(false);
  }

  const enterEditMode = (): void => {
    toggleEdit(state => !state);
    toggleResize(state => !state);
  };

  const addSection = ({ title, span, id }: { title: string; span: number; id: string; }): void => {
    if (schema) {
      let newSchema = { ...schema };
      const sections = newSchema.sections;
      sections.push({ title, span, id, fields: [] });

      updateSchema(newSchema);
      updateLayout(state => [...state, { i: id, x: 0, y: 10000, h: 4, w: 4 }]);
    }
  };

  const configureSection = ({ target }: { target: HTMLInputElement; }, key: string) => {
    setNewSection((state) => ({ ...state, [key]: target.value }))
  };

  const handleNewFieldState: HandleNewFieldState = (fieldName, value) => {
    setNewField(state => ({ ...state, [fieldName]: value }))
  }

  const inputFunctions = {
    handleInput(e: any, key: string): void {
      setData({ ...formData, [key]: e.target.value })
    },
    handleSelect(val: any, key: string): void {
      setData({ ...formData, [key]: val })}
  };

  useEffect(() => {
    const lsLayout = localStorage.getItem('layout');
    const lsData = localStorage.getItem('data');
    const lsSchema = localStorage.getItem('schema');

    if (lsLayout) {
      updateLayout(JSON.parse(lsLayout));
    }
    if (lsData) {
      setData(JSON.parse(lsData));
    }
    if (lsSchema) {
      updateSchema(JSON.parse(lsSchema));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('schema', JSON.stringify(schema));
  }, [schema]);

  useEffect(() => {
    localStorage.setItem('layout', JSON.stringify(layout));
  }, [layout]);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(formData));
  }, [formData]);

  return (
    <Row style={{ margin: '18px' }}>
      <Col span={2} offset={22}>
        <Button type='dashed' style={{ margin: '12px 0 0 0' }} onClick={() => enterEditMode()}> {editable ? 'Exit' : 'Enter'} Edit Mode </Button>
      </Col>
      {editable && (
        <Col span={24}>
          <Card>
            <Button onClick={() => toggleSectionModal(true)} key='new-section'> New Section </Button>
          </Card>
        </Col>
      )}
      <Layout>
        {schema && (
          <Row>
            <Col span={24}>
              <h1> {schema.form_title} </h1>
              <ResponsiveGridLayout layouts={{ lg: layout }}
                className="layout"
                cols={{ lg: 12 }}
                rowHeight={48}
                resizeHandles={['se']}
                isDraggable={editable}
                isResizable={resizable}
                onLayoutChange={updateLayout}
              >
                {schema.sections.map((section, index) => (
                  <div key={section.id}>
                    <Card title={section.title} key={index} extra={<Button ghost onClick={() => addField(section.title)} type='primary'> Add Field </Button>}>
                      <Row gutter={12}>
                        {section.fields.map(field => {
                          // Need to figure these out
                          // @ts-ignore
                          const Comp = componentMap[field.widget];
                          //@ts-ignore
                          const func = inputFunctions[field.props.function]

                          return (
                            <Col span={field.span}>
                              <Comp {...field.props} handleChange={func} formData={formData} />
                            </Col>
                          )
                        })}
                      </Row>
                    </Card>
                  </div>
                ))}
              </ResponsiveGridLayout>
            </Col>
            <Col span={24}>
              <h1> FORM OUTPUT </h1>
              <h2>{JSON.stringify(formData, null, 2)}</h2>
            </Col>
          </Row>
        )}
        <InputModal
          submitModal={submitModal}
          toggleVisible={toggleVisible}
          modalVisible={modalVisible}
          newField={newField}
          handleNewFieldState={handleNewFieldState}
          selectedSection={selectedSection}
        />
        <SectionModal
          sectionModal={sectionModal}
          configureSection={configureSection}
          toggleSectionModal={submitSectionModal}
          newSection={newSection}
          submitSectionModal={submitSectionModal}
        />
      </Layout>
    </Row>
  )
}

export default FormGenerator;