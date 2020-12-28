import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  strike: {
    textDecoration: "line-through"
  },
  empty_text: {
    color: '#bbbbbb'
  }
}));


export default function Todo({todos, onDelete, onSelected, onChecked}) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {todos.length === 0 &&
        <Typography variant="h5" component="h2" align="center" className={classes.empty_text}>
          Empty Todos
        </Typography>
      }
      {todos.length >= 1 && todos.map(item => {
        const labelId = `checkbox-list-label-${item.id}`;
        return (
          <ListItem key={item.id} dense button onClick={() => onSelected(item)}>
            <ListItemIcon onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}>
              <Checkbox
                edge="start"
                checked={item.status === 1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                onChange={() => onChecked(item)}
              />
            </ListItemIcon>
            <ListItemText
              id={labelId}
              primary={item.title}
              className={item.status === 1 ? classes.strike : null}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onSelected(item)}>
                <EditIcon color="primary"/>
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item)}>
                <DeleteIcon color="error"/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

Todo.propTypes = {
  todos: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
}

Todo.defaultProp = {
  todos: [],
  onDelete: () => {},
  onSelected: () => {},
  onChecked: () => {},
}
