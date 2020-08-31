import React, {Component} from 'react'
import {isAuthenticated} from '../auth/auth'
import {Redirect} from 'react-router-dom'
require("dotenv").config()

class Profile extends Component {

    constructor() {
        super()
        this.state={
            user: "",
            redirectToSignin: false
        }
    }

    componentDidMount() {
       
        const userId = this.props.match.params.userId
        const url = `${process.env.REACT_APP_API_URL}/user/${userId}`
        //console.log("GEt URL ", url)
        const authToken = `Bearer ${isAuthenticated().jwt}` 
        fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: authToken
            }
        })
        .then(response => {
            return response.json()
            
        })
        .then(data => {
            if(data.error){
                this.setState({redirectToSignin: true})
            } else {
               this.setState({user: data})
            }
        })
    }

    render(){
        const redirectToSignin = this.state.redirectToSignin;
        if(redirectToSignin) return <Redirect to="/signin"/>

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>Hello, {isAuthenticated().user.name}!</p>
                <p>{`Joined ${new Date(this.state.user.created)}`}</p>
            </div>
        )
    }
}

export default Profile