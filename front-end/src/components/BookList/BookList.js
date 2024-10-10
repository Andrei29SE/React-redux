import './BookList.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, toggleFavourite } from '../../redux/books/actionCreators'
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectFavouriteFilter,
} from '../../redux/slices(modern appr)/filterSlice'

function BookList() {
  // Subscrib to state
  const books = useSelector((state) => state.books)
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const favouriteFilter = useSelector(selectFavouriteFilter)
  // handle functions
  const dispatch = useDispatch()
  const handleOnDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }
  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id))
  }
  // Filters block
  const filteredBooks = books.filter((book) => {
    const matchTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
    const matchFavourite = favouriteFilter ? book.isFavourite : true
    return matchTitle && matchAuthor && matchFavourite
    // * '||; I'vent got any differences with &&
  })
  // Hightlight mathes while inputing filters
  const hilitghtMatch = (text, filter) => {
    if (!filter) return text
    const regexp = new RegExp(`(${filter})`, 'gi')

    return text.split(regexp).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className='highlight'>
            {substring}
          </span>
        )
      }
      return substring
    })
  }

  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books avasilable</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className='book-info'>
                {++i}) {hilitghtMatch(book.title, titleFilter)} by{' '}
                <strong>{hilitghtMatch(book.author, authorFilter)}</strong> ({book.source})
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
