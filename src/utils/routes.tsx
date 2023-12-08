import {
  DashboardChartsPage,
  DashboardProductsPage,
  LoginPage,
  RegisterPage,
} from "pages";
import { createBrowserRouter } from "react-router-dom";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <DashboardProductsPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard/products",
    element: <DashboardProductsPage />,
  },
  {
    path: "/dashboard/charts",
    element: <DashboardChartsPage />,
  },
]);
