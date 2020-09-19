import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './login';
import Layout from './layout';

function Main() {
    return (
        <Router>
            <Route path='/login/' exact component={Login}></Route>
            <Route path='/index/' exact component={Layout}></Route>
        </Router>
    )
}

export default Main;