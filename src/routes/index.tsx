import { createBrowserRouter } from "react-router-dom";
import Root from "@/routes/root";
import Dashboard from "@/routes/dashboard";
import Auth from "@/routes/auth";
import Admin from "./admin";
import { Sepet } from "./sepet/sepet";
import Siparis from "./siparis";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "auth",
        element: <Auth></Auth>,
      },
      {
        path: "admin",
        element: <Admin></Admin>,
      },
      {
        path: "sepet",
        element: <Sepet></Sepet>,
      },
      {
        path: "siparis",
        element: <Siparis></Siparis>,
      },
    ],
  },
]);

export { router };
