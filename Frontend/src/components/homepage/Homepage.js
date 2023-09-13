import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Homepage = () => {
    const history = useHistory();
    const isLoggedIn = localStorage.getItem('token');

    const handleLogout = () => {
        history.push('/');
        localStorage.removeItem('token');
    };

    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Homepage</Link>
                </li>
                <li>
                    <Link to="/destination">Destination</Link>
                </li>
                <li>
                    <Link to="/review">Reviews</Link>
                </li>
                <li>
                    <Link to="/trips">Trip Plans</Link>
                </li>
                {isLoggedIn ? (
                    <div>
                        <li>
                            <Link to="/booking">Booking</Link>
                        </li>
                        <li>
                            <Link to="/user">My Account</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                    </div>
                ) : (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Homepage;
