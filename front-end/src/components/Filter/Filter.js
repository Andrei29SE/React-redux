import './Filter.css'
import { setTitleFilter, selectTitleFilter } from '../../redux/slices(modern appr)/filterSlice'
import { useDispatch, useSelector } from 'react-redux'

function Filter() {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }
  return (
    <div className='app-block filter'>
      <div className='filter-group'>
        <input
          value={titleFilter}
          onChange={handleTitleFilterChange}
          type='text'
          placeholder='Filter by title...'
        />
      </div>
    </div>
  )
}

export default Filter
