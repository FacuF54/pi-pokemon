import React from 'react';
import { useNavigate } from 'react-router-dom';
import landing from './landing.module.css';

const LandingPage = ()=> {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/home')
    };

    return (
        <div className={landing.contain}>
            <div className={landing.containButton}>
                <button onClick={handleClick}>Welcome pokeFriend! ►</button>
            </div>
        </div>
    )
}

export default LandingPage 
 