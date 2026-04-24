import { stateManagementZustandUI } from "@/lib/stateManagementZustandUI";
import { Button } from "@base-ui/react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const Home = (): ReactElement => {
  const sidebarCollapsed = stateManagementZustandUI(
    (state) => state.sidebarCollapsed,
  );
  const toggleSidebar = stateManagementZustandUI(
    (state) => state.toggleSidebar,
  );

  // const lastVisitedPage = stateManagementZustandUI(
  //   (state) => state.lastVisitedPage,
  // );
  // const setLastVisitedPage = stateManagementZustandUI(
  //   (state) => state.setLastVisitedPage,
  // );

  //cursor-pointer

  const navigate = useNavigate();
  return (
    <div className="main flex">
      <div className="m-5 sidebar w-2/12">
        {!sidebarCollapsed && (
          <Button
            className={"p-2 border rounded w-40 text-center cursor-pointer "}
            onClick={() => toggleSidebar()}
          >
            Open side bar
          </Button>
        )}
        {/* <div className="m-auto w-3/12"> */}
        {sidebarCollapsed && (
          <div className="bg-gray-300 p-5 rounded w-full ">
            <p
              className="p-2 mt-10 border rounded w-40 text-center m-auto cursor-pointer"
              onClick={() => {
                navigate("/student/list");
              }}
            >
              Student list
            </p>
            <p
              className="p-2 mt-10 border rounded w-40 text-center m-auto cursor-pointer"
              onClick={() => {
                navigate("/book/list");
              }}
            >
              Book list
            </p>
            <p
              className="p-2 mt-10 border rounded w-40 text-center m-auto cursor-pointer"
              onClick={() => {
                navigate("/book/addNewBook");
              }}
            >
              Add new Book
            </p>
            <p
              className="p-2 mt-10 border rounded w-40 text-center m-auto cursor-pointer"
              onClick={() => {
                navigate("/user/allUsers");
              }}
            >
              Users...
            </p>
            <p
              className="p-2 mt-10 border rounded w-40 text-center bg-red-100 m-auto cursor-pointer"
              onClick={() => {
                toggleSidebar();
              }}
            >
              Close X
            </p>
          </div>
        )}
        {/* </div> */}
      </div>
      <div className=" m-auto mt-50 flex flex-col justify-center items-center  w-8/12">
        <p className="font-bold text-7xl">Home page</p>
      </div>
    </div>
  );
};

export default Home;
