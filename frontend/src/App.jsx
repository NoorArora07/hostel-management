import React from 'react';
import Login from './Components/Login/Login';

function App() {
    return (
      <div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <h1 style={{ color: 'white', boxShadow: 'unset'}}>DORMIFY</h1>
    </div>
        <div>
            <h1>Authentication System</h1>
            <Login />
        </div>
      </div>
    );
}

export default App;
