import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
//rfce tao 1 component nhanh
//react router dom: khi chuyen trang no se khong tai trang moi no chi cap nhat noi dung trang web do thoi
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
