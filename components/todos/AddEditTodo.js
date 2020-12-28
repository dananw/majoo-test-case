import React, {useState, useReducer, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import moment from 'moment'

import { addTodo, editTodo, deleteTodo, setSelected } from '../../lib/slices/todosSlice'

const format = "YYYY-MM-DD HH:mm"

function reducer(prevState, newState) {
  return {
    ...prevState,
    ...newState,
  };
}

const initState = {
  title: "",
  description: ""
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditTodo({data, toggle, onToggle}) {
  const [error, setError] = useState(false);
  const dispatch = useDispatch()
  const [fields, setFields] = useReducer(reducer, initState)

  const mode = data ? "Edit" : "Add"

  useEffect(() => {
    if(mode === "Edit") {
      setFields({
        title: data.title,
        description: data.description
      })
    }

  }, [data])

  const changeHandler = e => {
    setFields({ [e.currentTarget.name]: e.currentTarget.value });
  }

  const handleClose = () => {
    onToggle();
    setError(false)
    setFields(initState)
    dispatch(setSelected(null))
  };

  const simpleGenerateID = () => {
    return Date.now()
  }

  const simpleValidate = (fields) => {
    if(fields.title.toString().trim() !== ""){
      return true
    }else if(fields.description.toString().trim() !== "") {
      return true
    }
    return false
  }

  const handleDelete = () => {
    dispatch(deleteTodo(data))
    handleClose();
  }

  const handleAction = () => {
    if(!simpleValidate(fields)) {
      setError("Title And Description is mandatory")
      return
    }

    const payload = {
      id: simpleGenerateID(),
      title: fields.title,
      description: fields.description,
      status: 0,
      createdAt: moment().format(format)
    }

    if(mode === "Add") {
      dispatch(addTodo(payload))
    }else{
      payload.id = data.id
      payload.status = data.status
      dispatch(editTodo(payload))
    }

    handleClose();
  }

  return (
    <div>
      <Dialog
        open={toggle}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="form-dialog-title">{`${mode} Todo`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            onChange={changeHandler}
            value={fields.title}
            required
          />
          <TextField
            variant="outlined"
            margin="dense"
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            onChange={changeHandler}
            value={fields.description}
            required
          />
          {error && <Alert severity="error" closeText="close" >{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleAction}>
            {`${mode} todo`}
          </Button>
          {mode === 'Edit' &&
            <Button color="secondary" onClick={handleDelete}>
              {`Delete todo`}
            </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
