import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
   
  },
  {
    path: "/songs",
        element: <App/>
  },
  {
    path: "/Register",
        element: <Register/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);