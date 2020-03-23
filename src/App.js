import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    }
  }

  // Event handler for adding players:
  addPlayer = () => {
    let players = [...this.state.players];
    players.push({});
    this.setState({
      players: players
    })
  }

  render() {
    return(
      <div>
        <Button variant='contained' color='primary' endIcon={<PersonAddIcon/>} onClick={this.addPlayer}>
          Add Player
        </Button>
      </div>
    )
  }
}

export default App;
