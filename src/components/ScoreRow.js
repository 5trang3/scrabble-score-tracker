import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';

class ScoreRow extends React.Component {

  render() {
    const tableCellStyle = { 'padding-right': '6px', 'padding-left': '6px' }
    return (
      <TableRow>
        <TableCell style={ tableCellStyle }>
          <IconButton onClick={() => this.props.addScoreRow(this.props.colIndex, this.props.rowIndex + 1) }>
            <AddIcon/>
          </IconButton>
        </TableCell>
        <TableCell style={ tableCellStyle }>
          <TextField margin='normal' value={ this.props.word } onChange={ (event) => this.props.handleTextChange(event, this.props.colIndex, this.props.rowIndex, 'word') }></TextField>
        </TableCell>
        <TableCell style={ tableCellStyle }>
          <TextField margin='normal'
                     value={ this.props.score }
                     onChange={ (event) => this.props.handleTextChange(event, this.props.colIndex, this.props.rowIndex, 'score') }
                     error={ isNaN(this.props.score) }
                     helperText={isNaN(this.props.score) ? 'Score must be a number.' : '' }></TextField>
        </TableCell>
        <TableCell style={ tableCellStyle }>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

export default ScoreRow;
