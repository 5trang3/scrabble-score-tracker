import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlayerColumn from './components/PlayerColumn'
import Grid from '@material-ui/core/Grid';

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

  // Function for creating player columns:
  createPlayerColumns = (players) => {
    const playerColumns = players.map(function(player, index) {
      return (
        <Grid item xs={3}>
          <PlayerColumn player={ player }/>
        </Grid>
      )
    })
    return playerColumns
  }

  render() {
    const playerColumns = this.createPlayerColumns(this.state.players)
    return(
      <div>
        <Button variant='contained' color='primary' endIcon={<PersonAddIcon/>} onClick={this.addPlayer}>
          Add Player
        </Button>
        <Grid container spacing={1}>
          { playerColumns }
        </Grid>
      </div>
    )
  }
}

export default App;
