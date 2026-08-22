import { createBrowserRouter } from "react-router";
import Login from "./features/auth/component/pages/login";
import Register from "./features/auth/component/pages/register";
import Home from "./features/interview/pages/home";
import Protected from "./features/auth/component/protected";
import Interview from "./features/interview/pages/interview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
     path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>
  }
]);

export default router;