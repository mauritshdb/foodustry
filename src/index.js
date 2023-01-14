import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './css/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import TSidebar from './components/TheSidebar';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Favorite from './pages/FavFood';
import AdminPanel from './pages/AdminPanel';


const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <TSidebar />
      <Outlet />
    </>,
    errorElement: <ErrorPage />,
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
      {
        path: '/favorites',
        element: <Favorite />
      },
      {
        path: '/admin',
        element: <AdminPanel />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
