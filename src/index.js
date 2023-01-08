import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './css/index.css';
import App from './App';
import NavbarTop from './components/TheNavbar';
import TSidebar from './components/TheSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';


const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <TSidebar />
      {/* <NavbarTop /> */}
      <Outlet />
    </>,
    errorElement: <h1>something error</h1>,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/register',
        element: <Register />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
