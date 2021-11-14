import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

const JoinForm = () => {
    const navigate = useNavigate()
    const [joinForm, setJoinForm] = useState({
        activityId: ''
    })
    const {activityId} = joinForm
    const {loginPlayer} = useContext(AuthContext)

    const onChangeJoinForm = event => setJoinForm({...joinForm, [event.target.name]:event.target.value})
    const join = async event => {
        event.preventDefault();
        console.log('haha prepare')
        try {
            const loginData = await loginPlayer(joinForm)
            if (loginData.success) {
                navigate('/dashboardplayer')
            } else {
                
            }
            console.log(loginData)
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
        <Form onSubmit={join}>
            <Form.Group>
                <Form.Control type='text' placeholder='Activity Code' name='activityId' className="Landing-input" required
                value={activityId}
                onChange={onChangeJoinForm} />
            </Form.Group>
            <Button variant='success' type='submit' className='Landing-input'>Go</Button>
        </Form>
        <p>Create your own game?
            <Link to='/login'>
                <Button variant='info' size='sm' className="">Login</Button>
            </Link>
        </p>
        </>
    )
}

export default JoinForm
