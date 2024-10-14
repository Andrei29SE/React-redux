import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBook, fetchBook } from '../../redux/slices(modern appr)/bookSlices'
import './BookFrom.css'
import booksData from '../../data/books.json'
import createBookWithId from '../../utils/createBookWithId'

function BookForm() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()
  //add random book
  const handleOnRandom = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]
    dispatch(addBook(createBookWithId(randomBook, 'random')))
  }

  // add book manually(controlled input)
  const handleSunbmit = (e) => {
    e.preventDefault()
    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author }, 'manual')))
      setTitle('')
      setAuthor('')
    }
  }

  // add random book from API
  const handleRandomBookAPI = () => {
    dispatch(fetchBook())
  }

  return (
    <div className='app-block book-form'>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSunbmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input
            type='text'
            id='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type='submit'>Add Book</button>
        <button type='button' onClick={handleOnRandom}>
          Add Random Book
        </button>
        <button type='button' onClick={handleRandomBookAPI}>
          Add random(API)
        </button>
      </form>
    </div>
  )
}

export default BookForm
