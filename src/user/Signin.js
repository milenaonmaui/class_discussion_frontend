import React, {Component} from 'react'

class Signin extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToRefer: false
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
        //destructure data from state
        const {email, password} =this.state
        //create new user object
        const user = {
            email: email,
            password: password
        };
        this.signin(user)
        .then(data => {
            if (data.error) this.setState({error: data.error})
            else{
                //if successful, first autheticate

                //then redirect
            }
        })
        
    }
    signin=(user) => {
        return fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            return res.json()
            //console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Sign In</h2>
                <div className="alert alert-danger" style={{display: this.state.error ? "": "none"}}>{this.state.error}</div>
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