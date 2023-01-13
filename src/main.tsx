import React from "react";
import ReactDOM from "react-dom/client";

import { Router } from './routes'
import { BrowserRouter } from "react-router-dom";

import './styles/global.css'
import './services/firebase'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
)
