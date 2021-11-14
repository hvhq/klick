import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'

const RegisterForm = () => {
    return (
        <Form>
            <Form.Group>
                <Form.Control type='text' placeholder='Username' name='username' className="Landing-input"required />
            </Form.Group>
            <Form.Group>
                <Form.Control type='password' placeholder='Password' name='password' className="Landing-input" required />
            </Form.Group>
            <Form.Group>
                <Form.Control type='password' placeholder='Re-enter Password' name='repassword' className="Landing-input" required />
            </Form.Group>
            <Button variant='success' type='submit' className='Landing-input'>Register</Button>
            <p>Back to login?
                <Link to='/login'>
                    <Button variant='info' size='sm' className="">Login</Button>
                </Link>
            </p>
        </Form>
    )
}

export default RegisterForm
