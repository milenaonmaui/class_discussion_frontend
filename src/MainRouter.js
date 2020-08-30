import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from "./core/Home"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import Navigation from "./core/Navigation"

const MainRouter = () => (
    <div>
        <Navigation />
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signin" component={Signin}/>
        </Switch>
    </div>
)

export default MainRouter