import React from 'react'
import './App.css';
import Table from './components/Table';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Puissance 4</h1>
        <Table />
      </div>
    )
  }
}

export default App;