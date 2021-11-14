import {createContext, useReducer, useEffect} from 'react'
import { AuthReducer } from '../reducers/AuthReducer'
import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import setAuthToken from '../utils/SetAuthToken'
export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        isPlayer: true
    });
    
    const loadUser = async () => {
        if (localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)

            if (response.data.success) {
                if (response.data.isPlayer) {
                    dispatch({type: 'SET_AUTH', payload: { isAuthenticated : true, user:response.data.user, isPlayer:true}})
                } else {
                    dispatch({type: 'SET_AUTH', payload: { isAuthenticated : true, user:response.data.user, isPlayer:false}})
                }
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({type:'SET_AUTH', payload: {isAuthenticated : false, user: null}})
        }
        console.log(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    }

    useEffect(() => loadUser(), [])

    const loginManager = async userForm => {
        try{
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.yourtoken)
                
            }
            return response.data

        } catch(error) {
            if (error) return error
            else return {success:false, message: error.message}
        }
    }

    const loginPlayer = async userForm => {
        try{
            console.log(userForm)
            const response = await axios.post(`${apiUrl}/auth/join`, userForm)
            console.log(response)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.yourtoken)
                console.log(response.data.yourtoken)
            }
            return response.data

        } catch(error) {
            if (error) return error
            else return {success:false, message: error.message}
        }
    }

    const authContextData = {loginManager, loginPlayer, authState}

    //return provider
    return (
        <AuthContext.Provider value={authContextData} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

