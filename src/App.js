import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <Button variant='contained' color='primary' endIcon={<PersonAddIcon/>}>
          Add Player
        </Button>
      </div>
    )
  }
}

export default App;
