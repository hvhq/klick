import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

const LoginForm = () => {

    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const {username, password} = loginForm
    const {loginManager} = useContext(AuthContext)

    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]:event.target.value})
    const login = async event => {
        event.preventDefault();
        try {
            const loginData = await loginManager(loginForm)
            if (loginData.success) {
                navigate('/dashboard')
            } else {
                
            }
            console.log(loginData)
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <Form onSubmit = {login}>
            <Form.Group>
                <Form.Control type='text' placeholder='Username' name='username' className="Landing-input" 
                required
                value={username}
                onChange={onChangeLoginForm} />
            </Form.Group>
            <Form.Group>
                <Form.Control type='password' placeholder='Password' name='password' className="Landing-input" required
                value={password}
                onChange={onChangeLoginForm} />
            </Form.Group>
            <Button variant='success' type='submit' className='Landing-input'>Log in</Button>
            <p>Don't have an account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className="">Register</Button>
                </Link>
            </p>
            <p>Want to join an activity?
                <Link to='/join'>
                    <Button variant='info' size='sm' className="">Join</Button>
                </Link>
            </p>
        </Form>
    )
}

export default LoginForm