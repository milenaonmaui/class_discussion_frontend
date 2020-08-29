import React, {Component} from 'react'

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
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
        const {name, email, password} =this.state
        //create new user object
        const user = {
            name: name,
            email: email,
            password: password
        };
        this.signup(user)
        .then(data => {
            if (data.error) this.setState({error: data.error})
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                })
        })
        
    }
    signup=(user) => {
        return fetch("http://localhost:8080/signup", {
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
                <h2 className="mt-5 mb-5">Sign Up</h2>
                <div className="alert alert-danger" style={{display: this.state.error ? "": "none"}}>{this.state.error}</div>
                <div className="alert alert-info" style={{display: this.state.open ? "": "none"}}>Account created successfully! Please sign-in.</div>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} value = {this.state.name} type="text" className="form-control"/>
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

export default Signup