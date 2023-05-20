import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { configureFakeBackend } from "./fakeBackend";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AccountsTable } from "./components/AccountsTable";
import { RegistrationForm } from "./components/RegistrationForm";
import { Home } from "./components/Home";
import "./App.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className={"contentWrapper"}>
        <Home />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div className={"contentWrapper"}>
        <RegistrationForm />
      </div>
    ),
  },
  {
    path: "/users",
    element: (
      <div className={"contentWrapper"}>
        <AccountsTable />
      </div>
    ),
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
configureFakeBackend();

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
