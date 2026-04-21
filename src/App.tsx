import { Route, Routes } from "react-router-dom"
import BookList from "./pages/BookList"
import StudentList from "./pages/StudentList"
import Error404 from "./pages/Error404"
import Home from "./pages/Home"
import BookAddForm from "./pages/BookAddForm"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/students" element={<StudentList />}></Route>
      <Route path="/books" element={<BookList />}></Route>
      <Route path="/addNewBook" element={<BookAddForm />}></Route>
      <Route path="/not" element={<Error404 />}></Route>
    </Routes>
  )
}

export default App
