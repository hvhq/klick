import JoinForm from "../components/auth/JoinForm"
import LoginForm from "../components/auth/LoginForm"
import RegisterForm from "../components/auth/RegisterForm"
import {AuthContext} from '../context/AuthContext'
import {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({authRoute}) => {
    const {authState: {authLoading, isAuthenticated, isPlayer}} = useContext(AuthContext)

    let body

    if (authLoading) {
        body = (
            <div className=''>
                <div className="spinner-border" role="status">

                </div>
            </div>
        )
    } else if (isAuthenticated && !isPlayer) {
        return <Navigate to='/dashboard' />
    } else if (isAuthenticated && isPlayer) {
        return <Navigate to='/dashboardplayer' />
    }
    else
    body = (
        <>
        { authRoute === 'join' && <JoinForm /> }
        { authRoute === 'login' && <LoginForm /> }
        { authRoute === 'register' && <RegisterForm /> }
        </>
    )
    return (
        <div>
            <div className='Center'>
                <h1>Klick</h1>
                {body}
            </div>
        </div>
    )
}

export default Auth;