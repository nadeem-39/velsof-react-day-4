import { Route, Routes } from "react-router-dom";
import StudentList from "@/pages/StudentList";
import StudentProfile from "@/pages/StudentProfile";
const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<StudentList />}></Route>
      <Route path=":studentId" element={<StudentProfile />}></Route>
    </Routes>
  );
};

export default StudentRoutes;
