import React, { Component } from 'react';
import "./ProjectForm.scss";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class ProjectForm extends Component{
    constructor(){
        super()
        this.state = {
            project_name: '',
            project_type: '',
            current_image_url: '',
            desired_image_url: '',
            city: '',
            state: '',
            description: '',
            completed: false
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = e => {
        e.preventDefault()
        axios.post("/project/create", this.state)
        .then(res => {
            alert('your project has been created ' + res.data)
            this.setState({Redirect: true});
        })
        .catch(err => console.log(err))

    }

    render(){
        if(this.state.Redirect === true){
            return <Redirect to='/Client'/>
        }
        return(
            <form className='ProjectForm'>
                <div className='smallInputs'>
                    <select name='project_type' onChange={this.changeHandler} >
                        <option value='Entire Home'>Full Build</option>
                        <option value='Kitchen'>Kitchen</option>
                        <option value='Bathroom'>Bathroom</option>
                        <option value='Pateo/Outdoor'>Pateo/Outdorr</option>
                        <option value='Shed/Garage'>Shed Garage</option>
                    </select>
                    <input name='project_name' onChange={this.changeHandler} placeholder='Project Name'></input>
                    <input name='current_image_url' placeholder='Current State' onChange={this.changeHandler}/>
                    <input name='desired_image_url' placeholder='Desired Outcome' onChange={this.changeHandler}/>
                    <input name='city' onChange={this.changeHandler} placeholder='City'></input>
                    <select name='state' onChange={this.changeHandler} placeholder='State'>
                        <option value='AL'>AL</option>  
                        <option value='AK'>AK</option>
                        <option value='AZ'>AZ</option>
                        <option value='CA'>CA</option>
                        <option value='CO'>CO</option>
                        <option value='CT'>CT</option>
                        <option value='DE'>DE</option>
                        <option value='FL'>FL</option>
                        <option value='GA'>GA</option>
                        <option value='HI'>HI</option>
                        <option value='ID'>ID</option>
                        <option value='IL'>IL</option>
                        <option value='IN'>IN</option>
                        <option value='IA'>IA</option>
                        <option value='KS'>KS</option>
                        <option value='KY'>KY</option>
                        <option value='LA'>LA</option>
                        <option value='ME'>MD</option>
                        <option value='MA'>MA</option>
                        <option value='MI'>MI</option>
                        <option value='MN'>MN</option>
                        <option value='MS'>MS</option>
                        <option value='MO'>MO</option>
                        <option value='MT'>MT</option>
                        <option value='NE'>NE</option>
                        <option value='NV'>NV</option> 
                        <option value='NH'>NH</option>
                        <option value='NJ'>NJ</option>
                        <option value='NM'>NM</option>
                        <option value='NY'>NY</option>
                        <option value='NC'>NC</option>
                        <option value='ND'>ND</option>
                        <option value='OH'>OH</option>
                        <option value='OK'>OK</option>
                        <option value='OR'>OR</option>
                        <option value='PA'>PA</option>
                        <option value='RI'>RI</option>
                        <option value='SC'>SC</option>
                        <option value='SD'>SD</option>
                        <option value='TN'>TN</option>
                        <option value='TX'>TX</option>
                        <option value='UT'>UT</option>
                        <option value='VT'>VT</option>
                        <option value='VA'>VA</option>
                        <option value='WA'>WA</option>
                        <option value='WV'>WV</option>
                        <option value='WI'>WI</option>
                        <option value='WY'>WY</option>
                    </select>
                </div>
                <input name='description' onChange={this.changeHandler} placeholder='Description'></input>
                <button type='submit' onClick={e => this.submitHandler(e)}>Create Project</button>
            </form>
        )
    }
}