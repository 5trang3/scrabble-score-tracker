import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlayerColumn from './components/PlayerColumn'
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

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
      players.push({
        name: '',
        scores: [{ word: '', score: ''}]
      });
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

  componentDidMount() {
    this.setState(JSON.parse(localStorage.getItem('scrabbleState')));
    window.addEventListener('beforeunload', () => {
      return localStorage.setItem('scrabbleState', JSON.stringify(this.state));
    });
  }

  // Function for creating player columns:
  createPlayerColumns = (players) => {
    const playerColumns = players.map((player, index) => {
      return (
        <Grid item xs={3}>
          <TextField variant='outlined' label='Name' fullWidth value={ this.state.players[index]['name']} onChange={ (event) => this.addName(event, index) }></TextField>
          <PlayerColumn player={ player }
                        colIndex={ index }
                        addScoreRow={ this.addScoreRow }
                        deleteScoreRow={ this.deleteScoreRow }
                        handleTextChange = { this.handleTextChange }
                        calculateScore = { this.calculateScore }
                        removePlayer = { this.removePlayer }/>

        </Grid>
      )
    })
    return playerColumns
  }

  // Event handler for removing players:
  removePlayer = (col) => {
    let players = [...this.state.players];
    players.splice(col, 1);
    this.setState({
      players: players
    })
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

  // Event handler for adding scoreRow components:
  addScoreRow = (col, row) => {
    let players = [...this.state.players];
    players[col].scores.splice(row, 0, { word: '', score: '' });
    this.setState({
      players: players
    })
  }

  // Event handler for removing scoreRow components:
  deleteScoreRow = (col, row) => {
    let players = [...this.state.players];
    players[col]['scores'].splice(row, 1);
    this.setState({
      players: players
    })
  }

  // Event handler for adding words and scores:
  handleTextChange = (event, col, row, type) => {
    let players = [...this.state.players];
    players[col]['scores'][row][type] = event.target.value;
    this.setState({
      players: players
    })
  }

  // Event handler for adding player names:
  addName = (event, col) => {
    let players = [...this.state.players];
    players[col]['name'] = event.target.value;
    this.setState({
      players: players
    })
  }

  // Function to calculate score totals:
  calculateScore = (col) => {
    return this.state.players[col]['scores'].reduce(function(acc, scoreObj) {
      return (isNaN(scoreObj.score) || scoreObj.score === '') ? acc : acc + Number(scoreObj.score);
    }, 0)
  }

  // Event handler to start a new game:
  restart = () => {
    this.setState({
      players: [],
      alerts: {
        tooManyPlayers: 0
      }
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
        <Button variant='contained' color='secondary' onClick={ this.restart }>New Game</Button>
        <Grid container spacing={1}>
          { playerColumns }
        </Grid>
      </div>
    )
  }
}

export default App;
