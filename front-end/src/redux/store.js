import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './books/reducer'
import filterReducer from './slices(modern appr)/filterSlice'
const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
  },
})

export default store
