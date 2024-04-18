import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import BoardAdmin from "./routes/adminBoard";
import Privacy from "./routes/privacy";
import AccountSettings from "./routes/accountSettings";
import { currentUserSignal } from "./userSignal";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const user = currentUserSignal.value;
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
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "user/boards/new", element: <NewBoard /> },
      {
        path: "admin",
        element: user?.roles?.includes("ROLE_ADMIN") ? (
          <BoardAdmin />
        ) : (
          <ErrorPage />
        ),
      },
      {
        path: "account_settings",
        element: user ? <AccountSettings /> : <ErrorPage />,
      },
      {
        path: "privacy_settings",
        element: user ? <Privacy /> : <ErrorPage />,
      },
      user
        ? {
            path: "user/boards/:boardId",
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
          }
        : { element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
