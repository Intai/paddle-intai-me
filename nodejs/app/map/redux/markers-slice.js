import { filter, switchMap } from 'rxjs'
import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  markers: [],
}

export const initialise = createAction('initialise')

export const markersEpic = action$ => action$.pipe(
  filter(initialise.match),
  switchMap(action =>
    query(gql`
      query GetMarkers {
        markers {
          id
          title
          infoContent
          position {
            lat
            lng
          }
        }
      }
    `)

    ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
      map(response => fetchUserFulfilled(response))
    )
  )
)

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    setAll: (state, action) => {
      state.markers = action.payload
    },
  },
})

export default markersSlice.reducer
