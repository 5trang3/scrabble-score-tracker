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
          <IconButton>
            <AddIcon/>
          </IconButton>
        </TableCell>
        <TableCell style={ tableCellStyle }>
          <TextField margin='normal' defaultValue={ this.props.word }></TextField>
        </TableCell>
        <TableCell style={ tableCellStyle }>
          <TextField margin='normal' defaultValue={ this.props.score }></TextField>
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
