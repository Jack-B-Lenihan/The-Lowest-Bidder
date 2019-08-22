import React, {Component} from 'react';
import './Home.scss';
import BackgroundSlideshow from 'react-background-slideshow';
import { Link } from 'react-router-dom'
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import img4 from './img4.jpg';
import img5 from './img5.jpg';

export default class Home extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="container">
                <header className='landing'>
                    <h1>The Lowest Bidder</h1>

                    <div>
                         <Link to='/Login' className='button'>
                            Login
                        </Link>
                        <Link to='/Register' className='button'>
                            Register
                        </Link>
                   </div>

                </header>
                
                <div className='slideShow'>
                    <BackgroundSlideshow images={[img5, img4, img1, img2, img3]} />
                </div>

           </div>
        )
    }

}