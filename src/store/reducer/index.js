import {ADD_TODO, GET_TODO, DELETE_TODO} from '../constants/types'

const initialState = {
    todos: [],
    isLoading: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_TODO:
            return {
                ...state,
                todos : state.todos.concat(payload),
                isLoading : true
            };
        case GET_TODO:
            return{
                ...state,
                todos : payload
            };
        case DELETE_TODO:
            return{
                ...state,
                todos : state.todos.filter((item) => item._id !== payload)
            }
        default:
            return state;
    }
};

