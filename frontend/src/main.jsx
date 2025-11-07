import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { 
  Route, 
  RouterProvider, 
  createRoutesFromElements, 
  createBrowserRouter, 
} from "react-router-dom";
import {StoreProvider} from 'easy-peasy';
import store from './redux/features/store.js';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path='/' element={<App/> }/>)
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider store={store}>
    <RouterProvider router={router}/>
    </StoreProvider>
  </StrictMode>
);