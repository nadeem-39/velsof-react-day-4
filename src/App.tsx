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
import { useAuthStore } from "./lib/authStore";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/student/*", element: <StudentRoutes /> },
    { path: "/book/*", element: <BookRoutes /> },
    { path: "/user/*", element: <UserRoutes /> },
    { path: "/notes/*", element: <NotesRoutes /> },
    { path: "/*", element: <Error404 /> },
  ]);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Login />;
  }

  // return (
  //   <div classNameName="h-screen flex flex-col">
  //     {/* HEADER */}
  //     <div classNameName="h-14 border- bg-mist-700">
  //       <AuthNavbar />
  //     </div>

  //     {/* BODY */}
  //     <div classNameName="flex flex-1 overflow-hidden">
  //       {/* SIDEBAR */}
  //       <div classNameName="max-w-50 ease-linear  overflow-y-auto bg-mist-700 text-white ">
  //         <NavBar />
  //       </div>

  //       {/* MAIN CONTENT */}
  //       <div classNameName="flex-1 overflow-y-auto m-0.5 p-4 bg-gray-300">
  //         {routes}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div id="layout-wrapper">
      {/* HEADER */}
      <AuthNavbar />
      {/* SIDEBAR */}
      <NavBar />

      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">{routes}</div>
        </div>

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">2022 &copy; Copyright.</div>
              <div className="col-sm-6">
                <div className="text-sm-right d-none d-sm-block">
                  Support Email:
                  <a href="#" target="_blank" className="text-muted">
                    {" "}
                    support@velsof.com{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
