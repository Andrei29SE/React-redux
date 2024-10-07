import { createSlice } from '@reduxjs/toolkit'
// U can change state in redux slices approach (ONLY) as immer lib allowsa to do it(mutate state)
const initialState = {
  title: '',
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
    resetFilters: (state) => {
      return initialState
    },
  },
})

export const { setTitleFilter, resetFilters } = filterSlice.actions
export const selectTitleFilter = (state) => state.filter.title

export default filterSlice.reducer
