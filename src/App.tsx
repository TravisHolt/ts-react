import React, { useState } from 'react';
import FormGenerator from './components/FormGenerator';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';

interface Routes {
  path: string;
}

const { Header } = Layout;

const App = () => {
  const [routes, setRoutes] = useState<Routes[]>([{ path: '/home' }]);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ zIndex: 2}} />
      <Switch>
        { routes.map(route => (
          <Route path={route.path} component={FormGenerator} />
        ))}
        <Redirect from='/' to='/home' />
      </Switch>
    </Layout>
  )
};

export default App;