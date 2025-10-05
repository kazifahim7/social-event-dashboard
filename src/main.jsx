import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginForm from './components/Login.jsx';
import MainLayout from './MainLayout/MainLayout.jsx';
import ForgotPassword from './components/forgot.jsx';
import SetNewPassword from './components/ResetPassword.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserManagement from './pages/UserManageMent.jsx';
import EventManagement from './pages/EventManagement.jsx';
import PaymentHistory from './pages/Payment.jsx';
import AdMinPrivate from './private/AdminPrivate.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        index: true,
        element: <AdMinPrivate><Dashboard></Dashboard></AdMinPrivate>, 
      },
      {
        path: "manageUser",
        element: <AdMinPrivate><UserManagement></UserManagement></AdMinPrivate>, 
      },
      {
        path: "eventManagement",
        element: <AdMinPrivate><EventManagement></EventManagement> </AdMinPrivate>
      },
      {
        path: "payment",
        element: <AdMinPrivate><PaymentHistory></PaymentHistory>w</AdMinPrivate>
      }
     
    ]
  },
  {
    path: "/login",
    element: <LoginForm></LoginForm>
  },
  {
    path: "/forgot",
    element: <ForgotPassword></ForgotPassword>
  },
  {
    path: "/reset-pass",
    element: <SetNewPassword></SetNewPassword>

  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  
  </StrictMode>,
)
