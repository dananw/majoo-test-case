import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './lib/slices/todosSlice'

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
  devTools: true,
})