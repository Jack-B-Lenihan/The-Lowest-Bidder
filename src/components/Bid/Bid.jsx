import React, { Component } from 'react';
import "./Bid.scss";
import { Link , Redirect} from 'react-router-dom';
import axios from 'axios';


export default class Bid extends Component{
    constructor(){
        super()
        this.state = {
            Costs: '',
            Total: '',
            Plan: '',
            Timeframe: '',
            id: 0,
            toContractor: false
        }

        this.submit = this.submit.bind(this);
    }

    componentDidMount(){
        this.setState({id: this.props.match.params.id})
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    async submit(e){
        e.preventDefault();
        const { Costs, Total, Plan, Timeframe, id} = this.state;
        const form = await axios.post('/send',{
            Costs, Total, Plan, Timeframe, id    
        })
    }


    render(){
        if (this.state.toContractor) {
            return <Redirect to='/Contractor' />
        }
        return(
            <form className='bidForm'>
                <h1>Compose Your Bid</h1>
                <div className ='column'>
                    <input onChange={this.changeHandler} name='Costs' className='longInput' placeholder='Cost breakdown'/>
                    <h6>Give an outline of the major costs associated with the project as well as the points where you will require payment</h6>
                    <input onChange={this.changeHandler} name='Total' placeholder='Total Cost'/>
                </div>

                <div className='column'>
                    <input onChange={this.changeHandler} name='Plan' className='longInput' placeholder='Build plan'/>
                    <h6>Provide a general rationale for the timeframe you specified as well as a rough plan for the project outlining the most time consuming tasks.</h6>
                    <input onChange={this.changeHandler} name='Timeframe' placeholder='Minimum time required'/>
                </div>

                {/* <Link to='/Contractor'> */}
                    <button onClick={(e) => {
                        this.submit(e)
                        this.setState({toContractor: true})
                    }}type='submit'>Submit</button>
                {/* </Link> */}

            </form>
        )
    }
}