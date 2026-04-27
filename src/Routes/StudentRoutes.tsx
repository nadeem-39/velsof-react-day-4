import { Route, Routes } from "react-router-dom";
import StudentList from "@/pages/StudentList";
import StudentProfile from "@/pages/StudentProfile";
import ProtectedRoute from "./ProtectedRoutes";
const StudentRoutes = () => {
  return (
    <Routes>
      <Route
        path="list"
        element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path=":studentId"
        element={
          <ProtectedRoute>
            <StudentProfile />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default StudentRoutes;
