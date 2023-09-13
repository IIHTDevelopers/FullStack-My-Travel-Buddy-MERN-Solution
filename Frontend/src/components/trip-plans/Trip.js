import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Route, Switch } from 'react-router-dom';
import AddTrip from './AddTrip';
import AllTrips from './AllTrips';
import PopularTrips from './PopularTrips';
import MyTrips from './MyTrips';

const Trip = () => {
    return (
        <div>
            <h1>Trips</h1>
            <ul>
                <li>
                    <Link to="/trips/add/:id">Add Trip</Link>
                </li>
                <li>
                    <Link to="/trips/all">All Trips</Link>
                </li>
                <li>
                    <Link to="/trips/popular">Popular Trips</Link>
                </li>
                <li>
                    <Link to="/trips/me">My Trips</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/trips/add/:id" component={AddTrip} />
                <Route path="/trips/all" component={AllTrips} />
                <Route path="/trips/popular" component={PopularTrips} />
                <Route path="/trips/me" component={MyTrips} />
            </Switch>
        </div>
    );
}

export default Trip;
