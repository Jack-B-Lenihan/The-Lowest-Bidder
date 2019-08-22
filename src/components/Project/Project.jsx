import React, { Component } from 'react';
import "./Project.scss";
import axios from 'axios';

export default class Project extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: 5
        }
    }

    deleteHandler = (num) => {
        axios.delete(`/project/delete/${num}`)
    }


    render(){
        const { card } = this.props;
        return(
            <div className='Project'>
                <button onClick={() => this.deleteHandler(card.project_id)}>
                    Delete
                </button>
            <div className='nametype'>
                <h3>{card.project_name}</h3>
                <h6>{card.city} {card.state}</h6>
            </div>
         
            <p>{card.description}</p>
            <div className='pics'>
                <img src={card.current_image_url}/>
                <img src={card.desired_image_url}/>
            </div>
        </div>

        )
    }
}