import { Route, Routes } from "react-router-dom";
import BookList from "@/pages/BookList";
import BookAddForm from "@/pages/BookAddForm";
import ProtectedRoute from "./ProtectedRoutes";
const BookRoutes = () => {
  return (
    <Routes>
      <Route
        path="list"
        element={
          <ProtectedRoute>
            <BookList />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="addNewBook"
        element={
          <ProtectedRoute>
            <BookAddForm />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default BookRoutes;
