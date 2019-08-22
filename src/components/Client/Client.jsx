import React, { Component } from 'react';
import "./Client.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Project from '../Project/Project';
import bidProject from '../BidProject/BidProject';
import BidProject from '../BidProject/BidProject';

export default class Client extends Component{
    constructor(){
        super()
        this.state = {
            myProjects: []
        }
    }

    componentDidMount(){
        axios.get('/project/clientFeed')
        .then(res => this.setState({myProjects: res.data
        })).catch(err => {
            alert('Sorry, cannot load projects');
            console.log(err);
        })
    }
    

    logout = e => {
        axios.get('/client/logout')
        .then(res => console.log(res.status))
        .catch(err => console.log(err));
    }

    render(){
        let projectFeed = this.state.myProjects.map((card, key) => {
            return <Project card={card} key={key}/>
        })
        return(
            <div>
                <div className='profile'>
                    <header>
                        <h1>Your Projects</h1> 

                        <Link to='/ProjectForm'>
                        <button>New Project</button>
                        </Link>

                        <Link to='/'>
                         <button onClick={this.logout}>Logout</button>
                        </Link>
                    </header>
                    <div className='myFeed'>
                        {projectFeed}

                    </div>
                </div>
            </div>
        )
    }
}