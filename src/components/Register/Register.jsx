import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect} from 'react-router-dom';
import "./Register.scss";

export default class Register extends Component{
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

    submitHandler = e => {
        e.preventDefault();
        const { email, password, isContractor} = this.state;
        if(isContractor === true){
            axios.post('/contractor/register', {email, password})
            .then(res => {
                console.log(email, password)
                alert('you have been registered'+ res.data.contractor_email);
                this.setState({redirect: true});
            })
            .catch(err => alert(err))
        }else{
            axios.post('/client/register', {email, password})
            .then(res => {
                console.log(email, password)
                alert('you have been registered' + res.data.client_email)
                this.setState({redirect: true});
            })
            .catch(err => alert('username taken ' + err));
        }

    }
    render(){
        const { buttonRoute, isContractor } = this.state;

        if(this.state.redirect === true) {
            return <Redirect to={buttonRoute} />
        }
        return(
            <form className="LoginForm" >
                <input name='email' onChange={this.changeHandler} placeholder='Email' type='text'></input>
                <input name='password' onChange={this.changeHandler} placeholder='Password' type='text'></input>

                <div>
                    <input checked={isContractor} onChange={this.boxChange} type="checkbox"/>
                    <h3>I'm a contractor</h3>
                </div>

                    <button className='button' type='submit' onClick={e => this.submitHandler(e)}>
                        Register
                    </button>
                
            </form>
        )
    }
}