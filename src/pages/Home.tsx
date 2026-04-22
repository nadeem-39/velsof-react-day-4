import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const Home = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <div className=" m-auto mt-50 flex flex-col justify-center items-center  ">
      <p className="font-bold text-9xl">Home page</p>
      <p
        className="p-2 mt-10 border rounded w-40 text-center"
        onClick={() => {
          navigate("/students");
        }}
      >
        Student list
      </p>
      <p
        className="p-2 mt-10 border rounded w-40 text-center"
        onClick={() => {
          navigate("/books");
        }}
      >
        Book list
      </p>
      <p
        className="p-2 mt-10 border rounded w-40 text-center"
        onClick={() => {
          navigate("/addNewBook");
        }}
      >
        Add new Book
      </p>
    </div>
  );
};

export default Home;
