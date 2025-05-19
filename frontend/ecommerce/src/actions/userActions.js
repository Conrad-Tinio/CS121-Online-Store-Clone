import axios from "axios";
import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL 
} from "../constants/userConstants";

export const register = (fname, lname, email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/register/', 
            {
                'fname': fname, 
                'lname': lname, 
                'email': email, 
                'password': password
            }, config
        ) 

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        if (data && data.details === "Please check your email to activate your account.") {
            localStorage.setItem('activateMessage', data.details)
        }
    } catch (error) {
        console.log('Registration error:', error.response);
        console.log('Error data:', error.response ? error.response.data : 'No response data');
        
        let errorMessage = 'An error occurred during registration';
        
        if (error.response && error.response.data) {
            if (error.response.data.details) {
                errorMessage = error.response.data.details;
            } else if (error.response.data.detail) {
                errorMessage = error.response.data.detail;
            }
        }
        
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: errorMessage
        })
    }
}

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        console.log('Attempting login with:', { email }); // Don't log password
        console.log('API endpoint:', '/api/users/login/');

        const { data } = await axios.post('/api/users/login/', 
            {
                username: email, 
                password: password
            }, config
        ) 

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
        // Set lastLoginTime to 0 to indicate a fresh login
        // This will trigger the welcome message in App.js
        localStorage.setItem('lastLoginTime', '0')
    } catch (error) {
        console.error('Login error:', error);
        
        let errorMessage = 'Network error - please check your connection';
        
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            errorMessage = error.response.data.detail || 'Login failed. Please try again.';
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received');
            errorMessage = 'No response from server. Please try again later.';
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            errorMessage = error.message;
        }
        
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: errorMessage
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}