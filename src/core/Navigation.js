import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth/auth'
//helper method to see if link is active

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#372196"}
    return {color: "white"}
}



const Navigation = ({history})=>(
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
            </li>
            
            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">Sign Up</Link>   
                    </li>
                </>
            )}
            {isAuthenticated() && (
            <>
                <li className="nav-item">
                    <button type="button" className="btn btn-link nav-link" onClick={() => signout(()=>history.push('/signin'))}>Sign Out</button>   
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/signup")} to={`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}'s Profile`}</Link>   
                </li>
            </>
            )}
        </ul>
    </div>
)

export default withRouter(Navigation);

