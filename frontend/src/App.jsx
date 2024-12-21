import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import SignUp2 from './Components/Login/SignUp2';
import Home from './Components/Home/Home'; // Import Home component

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} />  */}
      <Route path="./Components/Login/SignUp" element={<SignUp />} />
      <Route path="./Components/Login/SignUp2" element={<SignUp2 />} />
      {/* <Route path="./Components/Login/Login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
