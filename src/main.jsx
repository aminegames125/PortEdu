import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { AlertProvider } from "./providers/AlertContext"; 
import App from "./App";
import Login from "./pages/Login";
import NotFound from "./pages/404Page";
import ProductInfo from "./pages/ProductInfo.jsx"; 
import ProductsByGrade from "./pages/ProductsByGrade"; 
import "./styles/index.css";


const router = createBrowserRouter([
  {
    path: "/PortEdu",
    element: <App />, 
  },
  {
    path: "/login",
    element: <Login />, 
  },
  {
    path: "/product/:number",
    element: <ProductInfo />, 
  },
  {
    path: "/products/:grade",
    element: <ProductsByGrade />, 
  },
  {
    path: "*",
    element: <NotFound />, 
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
