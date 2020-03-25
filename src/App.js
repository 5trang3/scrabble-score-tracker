import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlayerColumn from './components/PlayerColumn'
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      alerts: {
        tooManyPlayers: 0
      }
    }
  }

  // Event handler for adding players:
  addPlayer = () => {
    let players = [...this.state.players];
    if (players.length < 4) {
      players.push({});
      this.setState({
        players: players
      })
    }
    else {
      let alerts = Object.assign({}, this.state.alerts);
      alerts.tooManyPlayers = 1;
      this.setState({
        alerts: alerts
      })
    }
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

  // Function for creating alerts:
  createAlerts = (alerts) => {
    if (alerts.tooManyPlayers) {
      return (
        <Alert severity="error" onClose={() => this.removeAlerts('tooManyPlayers')}>There can only be a maximum of four players</Alert>
      )
    }
  }

  // Function for removing alerts:
  removeAlerts = (alertId) => {
    let alerts = Object.assign({}, this.state.alerts);
    alerts[alertId] = 0;
    this.setState({
      alerts: alerts
    })
  }

  render() {
    const playerColumns = this.createPlayerColumns(this.state.players)
    const alerts = this.createAlerts(this.state.alerts)
    return(
      <div>
        { alerts }
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
