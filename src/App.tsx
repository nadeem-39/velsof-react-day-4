import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import StudentRoutes from "./Routes/StudentRoutes";
import BookRoutes from "./Routes/BookRoutes";
import UserRoutes from "./Routes/UsersRoutes";
import { useRoutes } from "react-router-dom";
import NavBar from "./components/localComponents/NavBar";
import Login from "./pages/Login";
import AuthNavbar from "./components/localComponents/AuthNavbar";
import NotesRoutes from "./Routes/NotesRoute";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/student/*", element: <StudentRoutes /> },
    { path: "/book/*", element: <BookRoutes /> },
    { path: "/user/*", element: <UserRoutes /> },
    { path: "/notes/*", element: <NotesRoutes /> },
    { path: "/*", element: <Error404 /> },
  ]);

  return (
    <div className="h-screen flex flex-col">
      {/* HEADER */}
      <div className="h-14 border- bg-mist-700">
        <AuthNavbar />
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div className="max-w-50 ease-linear  overflow-y-auto bg-mist-700 text-white ">
          <NavBar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto m-0.5 p-4 bg-gray-300">
          {routes}
        </div>
      </div>
    </div>
  );
}

export default App;
