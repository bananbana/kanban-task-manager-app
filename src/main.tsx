import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./error-page";
import Root from "./routes/root";
import Index from "./routes";
import Board from "./routes/board";
import Task from "./routes/task";
import EditTask from "./routes/editTask";
import EditBoard from "./routes/editBoard";
import NewTask from "./routes/newTask";
import NewBoard from "./routes/newBoard";
import Login from "./routes/login";
import Register from "./routes/register";
import BoardAdmin from "./components/AdminBoard";
import Privacy from "./routes/privacy";
import AccountSettings from "./routes/AccountSettings";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/user/boards/new", element: <NewBoard /> },
      { path: "/admin", element: <BoardAdmin /> },
      { path: "/account_settings", element: <AccountSettings /> },
      { path: "/privacy_settings", element: <Privacy /> },

      {
        path: "/user/boards/:boardId",
        element: <Board />,
        children: [
          {
            path: "tasks/:taskId",
            element: <Task />,
          },

          {
            path: "tasks/:taskId/edit",
            element: <EditTask />,
          },
          {
            path: "edit",
            element: <EditBoard />,
          },
          {
            path: "tasks/new",
            element: <NewTask />,
          },

          {
            path: "new",
            element: <NewBoard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
