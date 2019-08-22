import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setInfo } from '../../redux/contactorReducer';
import TextField from '@material-ui/core';

import "./Login.scss";

class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            isContractor: false,
            buttonRoute: '/Client',
            redirect: false
        }       
    }
    boxChange = e => {
        const { isContractor } = this.state;
        if(isContractor === true){
            this.setState({isContractor: false});
            this.setState({buttonRoute: '/Client'});
        }else if(isContractor === false){
            this.setState({isContractor: true});
            this.setState({buttonRoute: '/Contractor'});
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = (e) => {
        e.preventDefault();
        const { email, password, isContractor} = this.state;
        if(isContractor === true){
            axios.post('/contractor/login', {email, password})
            .then(res => {
                this.props.setInfo(res.data)
                alert('you have been logged in'+ res.data.contractor_email)
                console.log(res)
                this.setState({redirect: true})
            })
            .catch(err => alert('Incorrect Password'))
        }else{
            axios.post('/client/login', {email, password})
            .then(res => {
                alert('you have been logged in'+ res.data.client_email)
                this.setState({redirect: true})
            })
            .catch(err => alert('Incorrect password.'));
        }
    }

    render(){
        const { isContractor, buttonRoute } = this.state;

        if(this.state.redirect === true) {
            return <Redirect to={buttonRoute} />
        }

        return(
            <form className='LoginForm'> 
                <input placeholder="Email" name='email' onChange={this.changeHandler}></input>
                <input type='password' placeholder="Password" name='password' onChange={this.changeHandler}></input>
                <div>
                <input checked={isContractor} onChange={this.boxChange} type="checkbox"/>
                    <h3>contractor?</h3>
                </div>
                <button className='button' onClick={e => this.submitHandler(e)}>Login</button>
            </form>
        )
    }
}

export default connect(null, { setInfo })(Login)

