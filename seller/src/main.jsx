
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import SellerContextProvider from './context/SellerContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SellerContextProvider>
   <App />
  </SellerContextProvider>

  </BrowserRouter>,
)
