import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {signin, authenticate} from '../auth/auth'

class Signin extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = (field) => (event) => {
        //clear errors when user starts entering
        this.setState({error: ""})
        this.setState({
            [field]: event.target.value
        })
    }

   
    handleSubmit = (ev) => {
        //first, prevent default realoding page behavior
        ev.preventDefault();
        this.setState({loading: true})
        //destructure data from state
        const {email, password} =this.state
        //create new user object
        const user = {
            email: email,
            password: password
        };
        signin(user)
        .then(data => {
            if (data.error) this.setState({error: data.error, loading:false})
            else{

                //console.log(data)
                //if successful, first authenticate
                
                authenticate(data.token, data.user, () => {
                    this.setState({redirectToReferer: true})
                })
                //then redirect
            }
        })
        
    }
    
    render() {
        if(this.state.redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Sign In</h2>
                <div className="alert alert-danger" style={{display: this.state.error ? "": "none"}}>{this.state.error}</div>
                {this.state.loading ? (<div className="jumbotron text-center"><h2>Loading...</h2></div>) : ("")}
                <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} value = {this.state.email} type="email" className="form-control"/>
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")}  value = {this.state.password} type="password" className="form-control"/>
                        <button onClick={this.handleSubmit} className="btn btn-raised btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default Signin