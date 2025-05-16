import React from 'react';
import StackNavigator from './src/layout/StackNavigator';
import { DeviceProvider } from './src/context/DeviceContext';

const App = () => {
  return (
    <DeviceProvider>
      <StackNavigator />
    </DeviceProvider>
  );
};

export default App;
