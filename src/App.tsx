import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import StudentRoutes from "./Routes/StudentRoutes";
import BookRoutes from "./Routes/BookRoutes";
import UserRoutes from "./Routes/UsersRoutes";
import { useRoutes } from "react-router-dom";
import NavBar from "./components/localComponents/navBar";

function App() {
  return (
    <div className="main flex ">
      <div className="w-3/12">
        <NavBar />
      </div>
      <div>
        {useRoutes([
          { path: "/", element: <Home /> },
          { path: "/student/*", element: <StudentRoutes /> },
          { path: "/book/*", element: <BookRoutes /> },
          { path: "/user/*", element: <UserRoutes /> },
          { path: "/*", element: <Error404 /> },
        ])}
      </div>
    </div>
  );
}

export default App;
