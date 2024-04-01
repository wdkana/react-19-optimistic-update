import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import OptimisticApp from './App2.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
   <OptimisticApp/>
  </React.StrictMode>,
)
