import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TableFooter from '@material-ui/core/TableFooter';
import ScoreRow from './ScoreRow'
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

class PlayerColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  createScoreRows = (scores) => {
      const scoreRows = scores.map((score, index) => {
        return <ScoreRow word={score.word}
                         score={score.score}
                         rowIndex={index}
                         colIndex={this.props.colIndex}
                         addScoreRow={ this.props.addScoreRow }
                         deleteScoreRow={ this.props.deleteScoreRow }
                         handleTextChange = { this.props.handleTextChange }/>
      })
      return scoreRows;
  }

  render() {
    const scoreRows = this.createScoreRows(this.props.player.scores)
    return(
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Word</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>
                <IconButton onClick={ () => this.props.removePlayer(this.props.colIndex)}>
                  <CloseIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scoreRows}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Total:</TableCell>
              <TableCell>{ this.props.calculateScore(this.props.colIndex) }</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )
  }
}

export default PlayerColumn;
