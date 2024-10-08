import './Filter.css'
import {
  setTitleFilter,
  selectTitleFilter,
  resetFilters,
  selectAuthorFilter,
  setAuthorFilter,
} from '../../redux/slices(modern appr)/filterSlice'
import { useDispatch, useSelector } from 'react-redux'

function Filter() {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }
  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }
  return (
    <div className='app-block filter'>
      <div className='filter-row'>
        <div className='filter-group'>
          <input
            value={titleFilter}
            onChange={handleTitleFilterChange}
            type='text'
            placeholder='Filter by title...'
          />
        </div>
        <div className='filter-group'>
          <input
            value={authorFilter}
            onChange={handleAuthorFilterChange}
            type='text'
            placeholder='Filter by author...'
          />
        </div>
        <button type='button' onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  )
}

export default Filter
