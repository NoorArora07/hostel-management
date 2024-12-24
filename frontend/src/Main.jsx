import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Components/Login/Login.jsx'
import SignIn from './Components/Login/SignUp.jsx'
import SignUp from './Components/Login/SignUp.jsx'
import SignUp2 from './Components/Login/SignUp2.jsx'
import Homepage from './Components/HomePage/homepage.jsx'
import { AuthProvider } from './store/auth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);