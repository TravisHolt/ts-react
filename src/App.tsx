import React from 'react';
import FormGenerator from './components/FormGenerator';
import { Layout } from 'antd';

const { Header } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ zIndex: 2}} />
      <FormGenerator />
    </Layout>
  )
};

export default App;