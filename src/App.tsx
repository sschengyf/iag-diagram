import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Toolbar />
        <div className="diagram-container">
          <Canvas />
        </div>
      </div>
    </Provider>
  );
};

export default App;
