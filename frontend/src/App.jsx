import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import SignUp2 from './Components/Login/SignUp2';
import Home from './Components/HomePage/homepage'; // Import Home component

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

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './Components/HomePage/homepage'; // Import Home component

// function App() {
//   return (
//     <Routes>
//       {/* Only display the Home component at the root path */}
//       <Route path="/" element={<Home />} />
//     </Routes>
//   );
// }

// export default App;

