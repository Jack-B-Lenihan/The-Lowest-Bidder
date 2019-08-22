import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import contractorReducer from './contactorReducer';

export default createStore(contractorReducer, applyMiddleware(promise));