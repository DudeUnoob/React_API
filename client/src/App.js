
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Users from './pages/Users';
import Signup from './pages/testSignup';
import Login from './pages/testLogin';
import Profile from './pages/Profile';
import Covid from './pages/Covid';
import Google from './pages/Google';
import GoogleProfile from './pages/GoogleProfile';
import Flashcards from './pages/Flashcards';

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
      <Route path='/googleprofile' element={<GoogleProfile />}>

      </Route>
      <Route path='/signup' element={<Google />}>

      </Route>
      <Route path='/flashcards' element={<Flashcards />}>

      </Route>
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
