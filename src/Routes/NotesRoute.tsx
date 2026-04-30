import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import NotesList from "@/pages/notesList";
import NotesAddForm from "@/pages/createNotes";
const NotesRoutes = () => {
  return (
    <Routes>
      <Route
        path="list"
        element={
          <ProtectedRoute>
            <NotesList />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="addNewNote"
        element={
          <ProtectedRoute>
            <NotesAddForm />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default NotesRoutes;
