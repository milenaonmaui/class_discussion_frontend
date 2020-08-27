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
  }
  
  getUsers(){
    this.setState({
      loading: true
    })
    axios('https://randomuser.me/api/?nat=US&results=5')
    .then(res => 
      this.setState({
        users: res.data.results,
        loading: false
      }))
  }

  componentDidMount(){
    this.getUsers()
  }
  render() {
    return <div className="App">
      {this.state.loading? <Loading msg="Loading message"/> : this.state.users.map(user => 
        <div key={user.cell}>
          <h3>{user.name.first} {user.name.last}</h3>
          <p>{user.email}</p>
        </div>)}
      </div>
  };
}

export default App;
