import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { Application } from './app/app'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <Router>
      <Application />
    </Router>
  </StrictMode>,
)
