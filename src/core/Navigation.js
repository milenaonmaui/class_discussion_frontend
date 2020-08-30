import React from 'react';
import {Link, withRouter} from 'react-router-dom'

//helper method to see if link is active

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#372196"}
    return {color: "white"}
}

export const signout = (next)=>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next()
        return fetch("http://localhost:8080/signout", {
            method: "GET"
        })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err =>console.log(err))
    }
} 

const Navigation = ({history})=>(
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">Sign Up</Link>   
            </li>
            <li className="nav-item">
                <button type="button" className="btn btn-link nav-link" onClick={() => signout(()=>history.push('/signin'))}>Sign Out</button>   
            </li>
        
        </ul>
    </div>
)

export default withRouter(Navigation);

