import { Navigate, Outlet} from 'react-router-dom';

const ProtectedRoutes=()=>{
  const user = localStorage.getItem("auth")
  return user ? <Outlet/> : <Navigate to="/login" />
}
export default ProtectedRoutes;

