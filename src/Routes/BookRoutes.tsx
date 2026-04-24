import { Route, Routes } from "react-router-dom";
import BookList from "@/pages/BookList";
import BookAddForm from "@/pages/BookAddForm";
const BookRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<BookList />}></Route>
      <Route path="addNewBook" element={<BookAddForm />}></Route>
    </Routes>
  );
};

export default BookRoutes;
