import React from 'react';
import PetList from './components/PetList';
import PetForm from './components/PetForm';
import PetDetail from './components/PetDetail';
import UpdatePet from './components/UpdatePet';
import './App.css';
import {Router} from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router>
        <PetList path="/"/>
        <PetForm path="/pet/new"/>
        <PetDetail path="/pet/:id"/>
        <UpdatePet path="/pet/:id/update"/>
      </Router>
    </div>
  );
}

export default App;
