import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Layout from './layout'
import { store } from '../redux/store'

const container = document.getElementById('app')
const element = (
  <Provider store={store}>
    <Layout />
  </Provider>
)

createRoot(container).render(element)
// hydrateRoot(container, element)
