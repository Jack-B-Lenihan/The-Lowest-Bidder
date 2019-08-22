import React, { Component } from 'react';
import axios from 'axios'
import "./Contractor.scss";
import admin from '../admin_logo.png';
import { connect } from 'react-redux';
import { displayInfo } from '../../redux/contactorReducer';
import { Link } from 'react-router-dom';
import BidProject from '../BidProject/BidProject';

class Contractor extends Component{
    constructor(){
        super()
        this.state = {
            contractor_name: null,
            bio: null,
            phone_number: null,
            field_name: '',
            field_value: '',
            clicked: false,
            projects: []
        }
    }

    componentDidMount(){
        axios.get('/project/contractorFeed').then(res => {
            this.setState({projects: res.data});
        }).catch(err => {
            alert('Sorry, cannot load projects');
            console.log(err);
        })
    }

    clickHandler = e => {
        this.setState({clicked: true});
    }
    saveHandler = e => {
        const { field_name, field_value } = this.state;
        for(var key in this.state){
            if(this.state[key]){
                // this.setState({field_name: key, field_value: this.state[key] });
                console.log(field_name)
                axios.put('/contractor/update', {field_name : key, field_value: this.state[key]})
                .then(res => console.log(res.data))
                .catch(err => alert('Oopsie poopsie '+ err));
            }    
        }
        this.setState({clicked: false});
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
    }

    logout = e => {
        axios.get('/client/logout')
        .then(res => console.log(res.status))
        .catch(err => console.log(err));
    }

    render(){
        const { image_url, contractor_name, bio, phone_number} = this.props.contractorInfo
        let contractorFeed = this.state.projects.map((card, key)=> {
            return <BidProject card={card} key={key} />
        })
        return(
            <div>
                <div className="contractorProfile">
                    <header>
                        <h1>Your Profile</h1>
                        <Link to='/'>
                            <button onClick={this.logout}>Logout</button>
                        </Link>
                    </header>

                    <div className='contactorInfo'>
                        {this.state.clicked ? 
                            (
                                <div className='contractorInfo'>
                                <img src={image_url}/>
                                    <div className='inputs'>
                                        <input name='contractor_name' placeholder='Name' onChange={this.changeHandler}/>
                                        <input name='phone_number' placeholder='phone number' onChange={this.changeHandler}/>
                                        <div className='bio'>
                                            <input name='bio' placeholder='bio' onChange={this.changeHandler}/>
                                        </div>
                                        <button onClick={this.saveHandler}>Save</button>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className='contractorInfo'>
                                    <img src={image_url}/>
                                    <div className='inputs'>
                                        <h3>Name: {contractor_name}</h3>
                                        <h3>PHone: {phone_number}</h3>
                                        <div className='bio'>
                                            {bio}
                                        </div>
                                        <button onClick={this.clickHandler}>EDIT</button>
                                    </div>
                                </div>
                            ) 
                        }

                    </div>

                    <h2>Available Projects</h2>
                    <div className='contractorFeed'>
                        {contractorFeed}
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState;
}

export default connect(mapStateToProps, { displayInfo })(Contractor)