import './BookList.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, toggleFavourite } from '../../redux/books/actionCreators'
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'

function BookList() {
  const books = useSelector((state) => state.books)
  const dispatch = useDispatch()
  const handleOnDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }
  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id))
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
                  <span onClick={() => handleToggleFavourite(book.id)}>
                    {book.isFavourite ? (
                      <BsBookmarksFill className='star-icon' />
                    ) : (
                      <BsBookmarks className='star-icon' />
                    )}
                  </span>
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
