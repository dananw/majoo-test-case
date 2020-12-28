import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

export const loadTodos = createAsyncThunk(
  'todos/loadTodos',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')

      return response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    selectedTodo: null,
    loading: true,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload)
    },
    deleteTodo(state, action) {
      const {id} = action.payload

      if(action.payload.status === 1) {
        state.error = "Finished todo can't be delete"
        return
      }

      const position = state.todos.findIndex((todo) => todo.id === id)
      state.todos.splice(position, 1)
    },
    editTodo(state, action) {
      const {id, title, description} = action.payload

      const todo = state.todos.find((todo) => todo.id === id)
      todo.title = title
      todo.description = description

      state.selectedTodo = action.payload
    },
    setSelected(state, action) {
      state.selectedTodo = action.payload
    },
    toggleChecked(state, action) {
      const {id, status} = action.payload
      const todo = state.todos.find((todo) => todo.id === id)

      if(status === 0) {
        todo.status = 1
      }else{
        todo.status = 0
      }
    },
    closeError(state, action) {
      state.error = null
    }
  },
  extraReducers: {
    [loadTodos.pending]: (state) => {
      state.todos = []
      state.loading = true
    },
    [loadTodos.fulfilled]: (state, action) => {
      state.todos = action.payload
      state.loading = false
    },
    [loadTodos.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const selectTodos = createSelector(
  (state) => ({
    todos: state.todos.todos,
    error: state.todos.error,
    loading: state.todos.loading,
    selectedTodo: state.todos.selectedTodo,
  }),
  (state) => state
)

export const { addTodo, deleteTodo, editTodo, closeError, toggleChecked, setSelected } = todosSlice.actions

export default todosSlice.reducer
