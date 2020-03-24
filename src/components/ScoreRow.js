import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';

class ScoreRow extends React.Component {

  render() {
    return (
      <TableRow>
        <TableCell>
          <IconButton>
            <AddIcon/>
          </IconButton>
        </TableCell>
        <TableCell>
          <TextField margin='normal' defaultValue='this.props.word'></TextField>
        </TableCell>
        <TableCell>
          <TextField margin='normal' defaultValue='this.props.score'></TextField>
        </TableCell>
        <TableCell>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

export default ScoreRow;
