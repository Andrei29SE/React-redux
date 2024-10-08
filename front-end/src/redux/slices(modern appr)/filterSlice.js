import { createSlice } from '@reduxjs/toolkit'
// U can change state in redux slices approach (ONLY) as immer lib allowsa to do it(mutate state)
const initialState = {
  title: '',
  author: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // Redux slice approach
      state.title = action.payload
      // Traditional Redux approach
      // return { ...state, title: action.payload }
    },
    setAuthorFilter: (state, action) => {
      // return { ...state, author: action.payload }
      state.author = action.payload
    },
    resetFilters: (state) => {
      return initialState
    },
  },
})
// reducers
export const { setTitleFilter, resetFilters, setAuthorFilter } = filterSlice.actions
// subscription functions(selectors)
export const selectTitleFilter = (state) => state.filter.title
export const selectAuthorFilter = (state) => state.filter.author

export default filterSlice.reducer
