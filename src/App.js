import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlayerColumn from './components/PlayerColumn'
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { Auth0Context } from "./react-auth0-spa";
import AppBar from '@material-ui/core/AppBar';

class App extends React.Component {

  static contextType = Auth0Context;

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
          <PlayerColumn player={ player }
                        colIndex={ index }
                        addScoreRow={ this.addScoreRow }
                        deleteScoreRow={ this.deleteScoreRow }
                        handleTextChange = { this.handleTextChange }
                        calculateScore = { this.calculateScore }
                        removePlayer = { this.removePlayer }
                        name= { this.state.players[index]['name'] }
                        addName = { this.addName }/>
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
        <Alert style={{ marginBottom: '8px' }} severity="error" onClose={() => this.removeAlerts('tooManyPlayers')}>There can only be a maximum of four players</Alert>
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
    players[col]['scores'].length === 1 ? players[col]['scores'][0] = { score: '', word: '' } : players[col]['scores'].splice(row, 1);
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

  // Create login and logout buttons:
  createLogin = () => {
    const { isAuthenticated, loginWithRedirect, logout } = this.context;
    return (
        // {!isAuthenticated && (
        //   <Button onClick={() => loginWithRedirect({})}>Log in</Button>
        // )}
        //
        // {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}

        isAuthenticated ? <Button onClick={() => logout()}>Log out</Button> : <Button onClick={() => loginWithRedirect({})}>Log in</Button>
    );
  }

  render() {
    const playerColumns = this.createPlayerColumns(this.state.players)
    const alerts = this.createAlerts(this.state.alerts)
    const authentication = this.createLogin();
    return(
      <Container>
        <AppBar>
          <Toolbar>
            <ButtonGroup variant='contained'>
              <Button onClick={ this.restart }>New Game</Button>
              <Button endIcon={<PersonAddIcon/>} onClick={this.addPlayer}>Add Player</Button>
            </ButtonGroup>
            <ButtonGroup variant='contained' style={{ marginLeft: 'auto' }} variant='contained'>
              { authentication }
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        <Toolbar/>
        { alerts }
        <Grid container spacing={1} style={{ marginTop: '12px' }}>
            { playerColumns }
        </Grid>
      </Container>
    )
  }
}

export default App;
