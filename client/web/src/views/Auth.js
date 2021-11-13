import JoinForm from "../components/auth/JoinForm"
import LoginForm from "../components/auth/LoginForm"


const Auth = ({authRoute}) => {
    let body
    body = (
        <>
        { authRoute === 'join' && <JoinForm /> }
        { authRoute === 'login' && <LoginForm /> }
        </>
    )
    return (
        <div>
            {body}
        </div>
    )
}

export default Auth