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
import Grid from '@material-ui/core/Grid'

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
    const tableCellStyle = { padding: '8px 8px'};
    const scoreRows = this.createScoreRows(this.props.player.scores)
    return(
      <Grid item xs={12} sm={6} lg={3}>
        <TextField variant='outlined' label='Name' fullWidth value={ this.props.name } onChange={ (event) => this.props.addName(event, this.props.colIndex) }></TextField>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center' style={ tableCellStyle }></TableCell>
                <TableCell style={ tableCellStyle }>Word</TableCell>
                <TableCell align='right' style={ tableCellStyle }>Score</TableCell>
                <TableCell align='right' style={ tableCellStyle }>
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
                <TableCell style={ tableCellStyle }></TableCell>
                <TableCell align='left' style={{ padding: '8px 8px', fontSize: '14px'}}>Total</TableCell>
                <TableCell align='right' style={{ padding: '8px 8px', fontSize: '14px'}}>{ this.props.calculateScore(this.props.colIndex) }</TableCell>
                <TableCell style={ tableCellStyle }></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    )
  }
}

export default PlayerColumn;
