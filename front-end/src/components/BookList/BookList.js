import './BookList.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, toggleFavourite } from '../../redux/books/actionCreators'
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'
import { selectTitleFilter, selectAuthorFilter } from '../../redux/slices(modern appr)/filterSlice'

function BookList() {
  const books = useSelector((state) => state.books)
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)

  const dispatch = useDispatch()
  const handleOnDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }
  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id))
  }

  const filteredBooks = books.filter((book) => {
    const matchTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
    return matchTitle && matchAuthor
    // * '||; I'vent got any differences with &&
  })
  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>
      {books.lenght === 0 ? (
        <p>No books avasilable</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
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
