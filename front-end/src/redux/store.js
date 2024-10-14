import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices(modern appr)/bookSlices'
import filterReducer from './slices(modern appr)/filterSlice'
import errorReducer from './slices(modern appr)/errorSlice'
const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
  },
})

export default store
