import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import SignUp2 from './Components/Login/SignUp2';
import Homepage from './Components/HomePage/homepage';
import NoPage from './Components/Login/NoPage';

// function App() {
//   return (
//     <div>
//     <div style={{display: 'flex', justifyContent: 'center'}}>
//     <h1 style={{ color: 'white', boxShadow: 'unset'}}>DORMIFY</h1>
//     </div>
//     </div>
//   );
// }


// function App() {
// return (
//   <div>
//     <BrowserRouter>
//     <Routes>
//       <Route index element={<Login />} />
//       <Route path="/Login" element={<Login />} />
//       <Route path="/SignUp" exact component={<SignUp />} />
//       <Route path="/SignUp2" exact component={<SignUp2 />} />
//       <Route path="/HomePage" exact component={<Homepage />} />
//       <Route path="*" element={<NoPage />} />
//     </Routes>
//     </BrowserRouter>
//   </div>
//   );
// }

function App() {
return (
  <div>
    <Homepage />
  </div>
  );
}

export default App;
  