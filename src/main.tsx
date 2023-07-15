import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FunctionalApp } from "./Functional/FunctionalApp.tsx";
import { Home } from "./Home.tsx";
import "./App.css";
import "./index.css";
import { ClassApp } from "./Class/ClassApp.tsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/functional",
    element: <FunctionalApp />,
  },
  {
    path: "/class",
    element: <ClassApp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
