import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
// const Login = React.lazy(() => import("./Compuments/Login.jsx"));
// const Chat = lazy(() => import("./Compuments/Chat.jsx"));
// const Analytics = lazy(() => import("./Compuments/Analytics.jsx"));
// const Loader = lazy(() => import("./Compuments/Loader.jsx"));
import Analytics from "./Compuments/Analytics.jsx";
import Chat from "./Compuments/Chat.jsx";
import Login from "./Compuments/Login.jsx";
import MyLineChart from "./Compuments/MyLineChart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:(
        <App />

    ),
    children: [
      {
        path: "/",
        element: (
        <Login />
      
    ),
      },
      {
        path: "/chats",
        element: (
        <Chat />
      
    ),
      },
      {
        path: "/analytic",
        element: (
        <Analytics />
      
    ),
      },
      {
        path: "/test",
        element: (
        < MyLineChart/>
      
    ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      
    <RouterProvider router={router} />
  </React.StrictMode>
);
