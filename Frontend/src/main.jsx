import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import './index.css'
import Homepage from './Routes/HomePage/homePage'
import Dashboard from './Routes/DashboardPage/dashboardPage'
import SignUpPage from './Routes/SignUpPage/signUpPage'
import SignInPage from './Routes/SignInPage/signInPage'
import ChatPage from './Routes/ChatPage/chatPage'
import RootLayout from './Layouts/RootLayout/rootLayout'
import DashboardLayout from './Layouts/DashboardLayout/dashboardLayout'


const router = createBrowserRouter([
 {
  element: <RootLayout />,
  children: [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/sign-in/*",
      element: <SignInPage />,
    },
    {
      path: "/sign-up/*",
      element: <SignUpPage />,
    },
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/chats/:id",
          element: <ChatPage />,
        }
      ]
    }
  ]
 }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)