import * as a from './actionTypes'
export const addBook = (newBook) => {
  return {
    type: a.ADD_BOOK,
    payload: newBook,
  }
}
export const deleteBook = (initialState) => {
  return {
    type: a.DELETE_BOOK,
  }
}
export const favouriteBook = (newBook) => {
  return {
    type: a.ADD_FAVOURITE_BOOK,
    payload: newBook,
  }
}
