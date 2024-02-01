import './App.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Signup from './components/Signup'
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './Services/Protectedroutes';



function App() {
  const [user, setuser] = useState(false);

  return (
    <>
    
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>} />
        <Route element={<ProtectedRoutes/>}>
          <Route exact path='/home' element={<Navbar/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
