import React from 'react';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import SignUp2 from './Components/Login/SignUp2';
import Home from './Components/HomePage/HomePage';
import Homepage from './Components/HomePage/HomePage';

function App() {
  return (
    <div>
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <h1 style={{ color: 'white', boxShadow: 'unset'}}>DORMIFY</h1>
  </div>
      <div>
          <Homepage />
      </div>
    </div>
  );
}

export default App;
  
