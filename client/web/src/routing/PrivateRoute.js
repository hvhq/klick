import LoginForm from "../components/auth/LoginForm";
import { Navigate } from "react-router";
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

function PrivateRoute({ children, player }) {

    const {
      authState: {authLoading, isAuthenticated, isPlayer }
    } = useContext(AuthContext)

    let body
    if (authLoading) {
      body = (
          <div className='Center'>
              <div className="spinner-border" role="status">
              </div>
          </div>
      )
      return body
    } else if (!isAuthenticated && (isPlayer || player)) {
      return <Navigate to='/join' />
    } else if (!isAuthenticated && !isPlayer) {
      return <Navigate to='/login' />
    } else
    return isAuthenticated ? children : <Navigate to="/join" />;
  }
  
  export default PrivateRoute;
  