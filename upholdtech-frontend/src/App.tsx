import React from 'react';
import { ReactNotifications } from 'react-notifications-component'
import BotAlert from './components/BotAlert';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <BotAlert />
    </div>
  );
}

export default App;
