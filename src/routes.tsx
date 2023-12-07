import { LoginPage, RegisterPage } from "pages";
import { createBrowserRouter } from "react-router-dom";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <>Dashboard</>,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);
