import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const Error404 = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <div className="border-2 rounded m-auto mt-50 flex flex-col justify-center items-center w-4/12 ">
      <p className="font-bold text-9xl text-red-800">404</p>
      <p>Page not found</p>
      <button
        className=" m-4 border-2 rounded pl-2 pr-2"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
};

export default Error404;
