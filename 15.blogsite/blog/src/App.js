import './App.css';
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login';
import { Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoutes from './Services/Protectedroutes';
import Addblog from './components/Addblog';
import Updateblog from './components/Updateblog';
import Page404 from './components/Page404';


function App() {

  const user = localStorage.getItem("auth")


  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='*' element={<Page404 />} />
        
        <Route element={<ProtectedRoutes />}>
          <Route exact path='/' element={<Navbar />} />
          <Route exact path='/addblog' element={<Addblog />} />
          <Route exact path='/updateblog' element={<Updateblog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
