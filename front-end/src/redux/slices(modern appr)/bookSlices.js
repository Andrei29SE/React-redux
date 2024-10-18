import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'
import axios from 'axios'
import { setError } from './errorSlice'

const initialState = {
  books: [],
  isLoadingViaAPI: false,
}

// async fetching data from backend server
export const fetchBook = createAsyncThunk('books/fetchBook', async (url, thunkAPI) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    thunkAPI.dispatch(setError(error.message))
    // //Option 1
    // throw error
    // Option 2
    return thunkAPI.rejectWithValue(error)
  }
})

const bookSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload)
    },
    deleteBook: (state, action) => {
      return { ...state, books: state.books.filter((book) => book.id !== action.payload) }
    },
    toggleFavourite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavourite = !book.isFavourite
        }
      })
    },
  },

  // Thunkfunc in reducer (check out https://redux-toolkit.js.org/api/createAsyncThunk)
  // Option 1
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action?.payload?.title && action?.payload?.author) {
        state.books.push(createBookWithId(action.payload, 'API'))
        state.isLoadingViaAPI = false
      }
    })
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true
    })
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false
    })
  },
  // Option 2
  // Doesn't work with this notation(have no idea why)
  // extraReducers: {
  //   [fetchBook.fulfilled]: (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.books.push(createBookWithId(action.payload, 'API'))
  //     }
  //   },
  // },
})

// reducers
export const { addBook, deleteBook, toggleFavourite } = bookSlice.actions

// Subscribe functions(selectors)
//
export const selectBooks = (state) => state.books.books
export const selectBooksViaAPI = (state) => state.books.isLoadingViaAPI

export default bookSlice.reducer
