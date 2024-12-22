import React from 'react';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import SignUp2 from './Components/Login/SignUp2';

function App() {
    return (
      <div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <h1 style={{ color: 'white', boxShadow: 'unset'}}>DORMIFY</h1>
    </div>
        <div>
            <SignUp />
        </div>
      </div>
    );
}

export default App;