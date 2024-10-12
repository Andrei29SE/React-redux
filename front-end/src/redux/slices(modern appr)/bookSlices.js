import { createSlice } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'
import axios from 'axios'
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
// thunk fuct for async fetching in Redux(this function passes to Redux via handleRandomBookAPI )
export const thunkFunction = async (dispatch, getState) => {
  //async actions
  try {
    const res = await axios.get('http://localhost:4001/random-book')
    if (res?.data?.title && res?.data?.author) {
      // Another way to set up condition is (res.data&& res.data.title && res.data.author)
      dispatch(addBook(createBookWithId(res.data, 'API')))
    }
  } catch (error) {
    console.log('Error', error.message)
  }
}

// Subscribe functions(selectors)
export const selectBooks = (state) => state.books

export default bookSlice.reducer
