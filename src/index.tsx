import './styles/app.scss'

import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Favicon from 'react-favicon'
import { App } from './app/app'
import { theme } from './theme'
import store from './store'
import { img } from './imgs'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter basename="/admin">
      <ThemeProvider theme={theme}>
        <Favicon url={img.favicon} />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
