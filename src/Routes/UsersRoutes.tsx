import { Route, Routes } from "react-router-dom";
import AllUsers from "@/pages/AllUsers";
import UserAccount from "@/pages/UserAccount";
import ProtectedRoute from "./ProtectedRoutes";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="allUsers"
        element={
          <ProtectedRoute>
            <AllUsers />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path=":userId"
        element={
          <ProtectedRoute>
            <UserAccount />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default UserRoutes;
