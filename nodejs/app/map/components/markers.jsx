import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialise } from '../redux/markers-slice'

function Markers() {
  const markers = useSelector(state => state.markers.markers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialise())
  }, [dispatch])

  return JSON.stringify(markers)
}

export default React.memo(Markers)
