import axios from 'axios';

const initialState = {
    contractorInfo: {}
}

const DISPLAY_INFO = 'DISPLAY_INFO';
const SET_INFO = 'SET_INFO'

export const setInfo = (user) => {
    return {
        type: SET_INFO,
        payload: user
    }
}

export const displayInfo = (contractor_email) => {
    let info = axios.get('/contractor/getOne', {contractor_email})
    return {
        type: DISPLAY_INFO,
        payload: info
    }
}

export default function(state=initialState, action){
    console.log(action)
    switch(action.type){
        case DISPLAY_INFO + '_FULFILLED':
            return { ...state, contractorInfo: action.payload};

        case SET_INFO: 
            return { ...state, contractorInfo: action.payload}
        default:
            return state;
    }
}