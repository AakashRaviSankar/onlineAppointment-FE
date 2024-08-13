import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Meeting from "./pages/meeting/Meeting";
import "./app.css";
import EmbeddedMeeting from "./pages/meeting/EmbeddedMeeting";

export default function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Meeting /> },
    { path: "/embeddedmeeting", element: <EmbeddedMeeting /> },
  ]);
  return <RouterProvider router={router} />;
}
