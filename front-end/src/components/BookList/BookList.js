import './BookList.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook } from '../../redux/books/actionCreators'

function BookList() {
  const books = useSelector((state) => state.books)
  const dispatch = useDispatch()
  const handleOnDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }
  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>
      {books.lenght === 0 ? (
        <p>No books avasilable</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div className='book-info'>
                {++i}) {book.title} by <strong>{book.author}</strong>
                <div className='book-actions'>
                  <button onClick={() => handleOnDeleteBook(book.id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
