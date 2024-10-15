import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'
import axios from 'axios'
import { setError } from './errorSlice'
const initialState = []

export const fetchBook = createAsyncThunk('bookManager/fetchBook', async (url, thunkAPI) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    thunkAPI.dispatch(setError(error.message))
    throw error
  }
})

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
  // Thunkfunc in reducer (check out https://redux-toolkit.js.org/api/createAsyncThunk)
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithId(action.payload, 'API'))
      }
    })
  },
})
// reducers
export const { addBook, deleteBook, toggleFavourite } = bookSlice.actions

// Subscribe functions(selectors)
export const selectBooks = (state) => state.books

export default bookSlice.reducer
