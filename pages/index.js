import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { deleteTodo, loadTodos, selectTodos, closeError, toggleChecked, setSelected } from '../lib/slices/todosSlice'

import {Container, Box, Button, Typography, Card} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import filter from 'lodash.filter'

// Component
import {TodoList, AddEditTodo, TodoSkeleton} from '../components/todos'

const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(2)
  },
  py: {
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
  },
  my: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  large_my: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

const Todos = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [toggleModal, setToggleModal] = useState(false)
  const { todos, error, selectedTodo, loading } = useSelector(selectTodos)

  useEffect(() => {
    async function dispatchLoadTodos() {
      await dispatch(loadTodos())
    }
    dispatchLoadTodos()
  }, [dispatch])

  const handleChecked = (todo) => {
    dispatch(toggleChecked(todo))
  }

  const handleSelected = (todo) => {
    dispatch(setSelected(todo))
    setToggleModal(!toggleModal)
  }

  const handleDelete = (todo) => {
    dispatch(deleteTodo(todo))
  }

  const handleCloseAlert = () => {
    dispatch(closeError())
  }

  const ascTodos = todos => {
    return todos.sort((a, b) => {
      let dateA = new Date(a.createdAt)
      let dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
  }

  const descTodos = todos => {
    return todos.sort((a, b) => {
      let dateA = new Date(a.createdAt)
      let dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  }

  return (
    <Container maxWidth="sm" className={classes.large_my}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        Majoo Todos
      </Typography>
        <Box>
          <Typography color="textSecondary" gutterBottom>Finished Todos</Typography>
          <Card className={classes.my}>
            {loading ? <TodoSkeleton className={classes.skeleton}/> :
              <TodoList
                todos={descTodos(filter(todos, {status: 1}))}
                onDelete={handleDelete}
                onSelected={handleSelected}
                onChecked={handleChecked}
              />
            }
          </Card>
          <Typography  color="textSecondary" gutterBottom>Un-Finished Todos</Typography>
          <Card className={classes.my}>
            {loading ? <TodoSkeleton className={classes.skeleton}/> :
              <TodoList
                todos={ascTodos(filter(todos, {status: 0}))}
                onDelete={handleDelete}
                onSelected={handleSelected}
                onChecked={handleChecked}
              />
            }
          </Card>
          {error && <Alert className={classes.my} severity="error" closeText="close" onClose={handleCloseAlert}>{error}</Alert>}
        </Box>
      <Button variant="contained" color="primary" onClick={() => setToggleModal(!toggleModal)}>
        Add Todo
      </Button>
      <AddEditTodo
        data={selectedTodo}
        toggle={toggleModal}
        onToggle={() => setToggleModal(!toggleModal)}
      />
    </Container>
  )
}

export default Todos
