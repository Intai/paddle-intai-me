import { catchError } from 'rxjs'
import { configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import markersReducer, { markersEpic } from './markers-slice'

const epicMiddleware = createEpicMiddleware()

const store = configureStore({
  reducer: {
    markers: markersReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    epicMiddleware,
  ],
})

const rootEpic = (...args) => combineEpics(
  markersEpic,
)(...args)
  .pipe(catchError((error, source) => {
    console.error(error)
    return source
  }))

epicMiddleware.run(rootEpic)

export default store
