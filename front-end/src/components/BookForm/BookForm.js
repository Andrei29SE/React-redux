import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, fetchBook, selectBooksViaAPI } from '../../redux/slices(modern appr)/bookSlices'
import './BookFrom.css'
import booksData from '../../data/books.json'
import createBookWithId from '../../utils/createBookWithId'
import { setError } from '../../redux/slices(modern appr)/errorSlice'
import { FaSpinner } from 'react-icons/fa'

function BookForm() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  //spinner state(in Redux)
  const isLoadingViaAPI = useSelector(selectBooksViaAPI)

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
    } else {
      dispatch(setError('Fields Title and Author should be fulfilled!'))
    }
  }

  // add random book from API
  const handleRandomBookAPI = () => {
    dispatch(fetchBook('http://localhost:4001/random-book-delayed'))
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

        <button type='button' onClick={handleRandomBookAPI} disabled={isLoadingViaAPI}>
          {isLoadingViaAPI ? (
            <>
              <span>Loading book...</span>
              <FaSpinner className='spinner' />
            </>
          ) : (
            'Add random(API)'
          )}
        </button>
      </form>
    </div>
  )
}

export default BookForm
