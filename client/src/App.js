
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Users from './pages/Users';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Covid from './pages/Covid';
import Google from './pages/Google';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}>
          <Route index element={<Home/>} />
          
          
        </Route>
      <Route path='/users' element={<Users />}>
      <Route index element={<Users/>} />
      </Route>
      <Route path='/signup' element={<Signup />}>
      </Route>
      <Route path='/login' element={<Login />}>
        
      </Route>
      <Route path='/profile' element={<Profile />}>

      </Route>
      <Route path='/covid' element={<Covid />}>

      </Route>
      <Route path='/google' element={<Google />}>

      </Route>
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
