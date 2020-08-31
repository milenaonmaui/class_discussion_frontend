import React, {Component} from 'react'
import {isAuthenticated} from '../auth/auth'
require("dotenv").config()

class Profile extends Component {

    constructor() {
        super()
        this.state={
            user: "",
            redirectToSignIn: false
        }
    }

    componentDidMount() {
       
        const userId = this.props.match.params.userId
        const url = `${process.env.REACT_APP_API_URL}/user/${userId}`
        const authToken = `Bearer ${isAuthenticated().jwt}` 
        console.log("Authorization Token", authToken)
        fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: authToken
            }
        })
        .then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                console.log(data)
            }
        })
    }

    render(){
        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>Hello, {isAuthenticated().user.name}!</p>
            </div>
        )
    }
}

export default Profile