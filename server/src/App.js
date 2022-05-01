
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Users from './pages/Users';
import Signup from './pages/Signup';

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
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
