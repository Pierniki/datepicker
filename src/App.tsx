import React from 'react';
import './App.css';
import DatePicker from './components/DatePicker';

const App = () => {
  return (
    <div className="App">
      <div className="title">
        <h1 className="title_primary">Pick</h1>
        <h1 className="title_secondary">a Date</h1>
      </div>
      <DatePicker />
    </div>
  );
};

export default App;
