import {ADD_TODO,GET_TODO,DELETE_TODO} from '../constants/types'
import axios from 'axios'

export const addTodo = (data) => dispatch => {
    dispatch({type : ADD_TODO, payload : data})
}

export const getData = () => async dispatch => {
    try {
       const res = await axios.get('http://localhost:4000/api/v1/todos')
        dispatch({type: GET_TODO, payload : res.data})
    
    } catch (error) {
        console.log("List Todo GET_DATA Action: ", error)
    }
}

export const deleteTodo = (id) =>  dispatch => {
    try {
        axios.delete("http://localhost:4000/api/v1/todos/" + id);
       dispatch({type : DELETE_TODO, payload : id})
    } catch (error) {
        console.log("List Todo  DELETE Action : ", error)
    }
} 