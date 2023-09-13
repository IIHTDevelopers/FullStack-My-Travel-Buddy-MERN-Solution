import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Route, Switch } from 'react-router-dom';
import AddDestination from './AddDestination';
import AllDestination from './AllDestinations';
import TopRatedDestinations from './TopRatedDestinations';

function Destination() {
    return (
        <div>
            <h1>Destination</h1>
            <ul>
                <li>
                    <Link to="/destination/add/:id">Add Destination</Link>
                </li>
                <li>
                    <Link to="/destination/all">All Destinations</Link>
                </li>
                <li>
                    <Link to="/destination/top-rated">TopRated Destinations</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/destination/add/:id" component={AddDestination} />
                <Route path="/destination/all" component={AllDestination} />
                <Route path="/destination/top-rated" component={TopRatedDestinations} />
            </Switch>
        </div>
    );
}

export default Destination;
