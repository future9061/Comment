import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const listSlice = createSlice({
  name: 'list',
  initialState: [],
  reducers: {
    getList: (state, action) => {
      return action.payload
    }
  },
})

export const { getList } = listSlice.actions

export default configureStore({
  reducer: {
    listSlice: listSlice.reducer,
  }
})