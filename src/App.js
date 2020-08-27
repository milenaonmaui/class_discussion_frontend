import React, {Component} from 'react';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    axios('https://randomuser.me/api/?nat=US&results=5')
    .then(res => this.setState({users: res.data.results}))
  }
  render() {
    return <div className="App">Getting now started!!!</div>
  };
}

export default App;
