import React, { Component } from 'react';
import './BidProject.scss';
import { Link } from 'react-router-dom';

export default class BidProject extends Component{
    constructor(){
        super()
    }
    render(){
        const { card } = this.props;
        return(
            <div className='bidProject'>
                <Link to={`/Bid/${card.client_id}`}>
                    <button>
                        Bid
                    </button>
                </Link>
                <div className='nametype'>
                    <h3>{card.project_name}</h3>
                    <h6>{card.city} {card.state}</h6>
                    <h6>{card.project_type}</h6>
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
