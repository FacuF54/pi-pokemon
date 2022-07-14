import React, {useState}from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Nav = () =>{
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleClick = (event) => {
        if (event.target.id === 'home') navigate('/home');
    };

    return(
        <div>
            
            <div>
                <input type="search" placeholder='Search Pokemon...' onChange={(event) => setSearch(event.target.value)} />
                <Link to={`detail?name=${search.toLowerCase()}`}>
                <button>
                    <b>Search</b>
                </button>
                </Link>
            
            <div>
            </div>
                <button onClick={handleClick} id='home'>Home</button>
            </div>

            <div>
                <Link to="create">
                    <button onClick={handleClick} id='create'>Create Your Pokemon!!</button>
                </Link>
            </div>

            <Outlet />
            
        </div>
    )
}

export default Nav;