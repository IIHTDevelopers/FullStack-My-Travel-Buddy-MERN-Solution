import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Route, Switch } from 'react-router-dom';
import AddReview from "./AddReview";
import AllReview from "./AllReview";
import UpdateReview from './UpdateReview';

function Reviews() {
    return (
        <div>
            <h1>Reviews</h1>
            <ul>
                <li>
                    <Link to="/review/all">All reviews</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/review/update/:id" component={UpdateReview} />
                <Route path="/review/add/:id" component={AddReview} />
                <Route path="/review/all" component={AllReview} />
            </Switch>
        </div>
    );
}

export default Reviews;
