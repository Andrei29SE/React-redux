import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const bookSlice = createSlice({
  name: 'bookManager',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload]
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload)
    },
    toggleFavourite: (state, action) => {
      return state.map((book) =>
        book.id === action.payload ? { ...book, isFavourite: !book.isFavourite } : book
      )
    },
  },
})

// reducers
export const { addBook, deleteBook, toggleFavourite } = bookSlice.actions
// Subscribe functions(selectors)
export const selectBooks = (state) => state.books

export default bookSlice.reducer
