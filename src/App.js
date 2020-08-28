import React, {Component} from 'react';
import axios from 'axios'
import Loading from './Loading'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  getUsers(){
    this.setState({
      loading: true
    })
    axios('https://randomuser.me/api/?nat=US&results=5')
    .then(res => 
      this.setState({
        users: [...this.state.users, ...res.data.results],
        loading: false
      }))
  }

  handleSubmit(e){
    e.preventDefault()
    this.getUsers()
  }

  componentDidMount(){
    this.getUsers()
  }

  render() {
    const {loading, users} = this.state;
    return <div className="container">
      {loading? <Loading msg="Loading message"/> : users.map(user => 
        <div key={user.cell}>
          <h3 style={{color: 'red'}}>{user.name.first} {user.name.last}</h3>
          <p>{user.email}</p>
          
        </div>)}
        <form onSubmit={this.handleSubmit}>
            <input type="submit" value = "Load More Users"/>
        </form>
      </div>
  };
}

export default App;
