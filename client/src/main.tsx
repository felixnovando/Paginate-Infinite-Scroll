import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import InsertItem from './pages/InsertItem';
import EditItem from './pages/EditItem';
import Layout from './layouts/Layout';
import Settings from './pages/Settings';
import Pagination from './pages/Pagination';
import Infinite from './pages/Infinite';
import { PopUpProvider } from './context';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/add-item",
    element: <Layout><InsertItem /></Layout>
  },
  {
    path: "/edit-item/:id",
    element: <Layout><EditItem /></Layout>
  },
  {
    path: "/settings",
    element: <Layout><Settings /></Layout>
  },
  {
    path: "/pagination",
    element: <Layout><Pagination /></Layout>
  },
  {
    path: "/infinite-scrolling",
    element: <Layout><Infinite /></Layout>
  },
  {
    path: "*",
    element: <Layout><NotFound /></Layout>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PopUpProvider>
      <RouterProvider router={router} />
    </PopUpProvider>
  </React.StrictMode>,
)
