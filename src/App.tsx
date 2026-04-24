import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import StudentRoutes from "./Routes/StudentRoutes";
import BookRoutes from "./Routes/BookRoutes";
import UserRoutes from "./Routes/UsersRoutes";
import { useRoutes } from "react-router-dom";
function App() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/student/*", element: <StudentRoutes /> },
    { path: "/book/*", element: <BookRoutes /> },
    { path: "/user/*", element: <UserRoutes /> },
    { path: "/*", element: <Error404 /> },
  ]);
}

export default App;
