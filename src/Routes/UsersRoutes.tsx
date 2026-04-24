import { Route, Routes } from "react-router-dom";
import AllUsers from "@/pages/AllUsers";
import UserAccount from "@/pages/UserAccount";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="allUsers" element={<AllUsers />}></Route>
      <Route path=":userId" element={<UserAccount />}></Route>
    </Routes>
  );
};

export default UserRoutes;
