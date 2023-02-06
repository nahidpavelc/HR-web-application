import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ApplyLeaves from "../../Pages/Home/ApplyLeaves/ApplyLeaves";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import UserUpdate from "../../Pages/UserUpdate/UserUpdate";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main>  </Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/userupdate',
        element: <UserUpdate></UserUpdate>
      },
      {
        path: '/applyleaves',
        element: <ApplyLeaves></ApplyLeaves>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard> </PrivateRoute>
  }
])
export default router;
