import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  let auth = localStorage.getItem('Token') ? true : false;
return (
    auth ? <Outlet/> : <Navigate to='/login'/>
  )
}