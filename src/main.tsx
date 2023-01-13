import React from 'react'
import ReactDOM from 'react-dom/client'
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import './styles/global.css'
import './services/firebase'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NewRoom />
  </React.StrictMode>,
)
