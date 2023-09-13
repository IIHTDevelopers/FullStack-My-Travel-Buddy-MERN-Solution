import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Route, Switch } from 'react-router-dom';
import UpcomingBooking from './UpcomingBooking';
import AllBooking from './AllBooking';
import AddBooking from './AddBooking';

const Booking = () => {
    return (
        <div>
            <h1>Booking</h1>
            <ul>
                <li>
                    <Link to="/booking/add/:id">Add Booking</Link>
                </li>
                <li>
                    <Link to="/booking/all">All Bookings</Link>
                </li>
                <li>
                    <Link to="/booking/upcoming">Upcoming Booking</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/booking/add/:id" component={AddBooking} />
                <Route path="/booking/all" component={AllBooking} />
                <Route path="/booking/upcoming" component={UpcomingBooking} />
            </Switch>
        </div>
    );
}

export default Booking;
