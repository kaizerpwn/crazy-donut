import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
