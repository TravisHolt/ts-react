import React from 'react';
import FormGenerator from './components/FormGenerator';
import { Layout } from 'antd';

const { Header } = Layout;

const App = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <div style={{ background: 'white', borderRight: '1px solid black', position: 'fixed', height: '100vh', width: '72px', marginTop: '64px' }}>
        ICONS
      </div>
      <div style={{ marginLeft: '72px' }}>
        <FormGenerator />
      </div>
    </Layout>
  )
};

export default App;