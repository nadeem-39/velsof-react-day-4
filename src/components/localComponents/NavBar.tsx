import { stateManagementZustandUI } from "@/lib/stateManagementZustandUI";
import { Button } from "@base-ui/react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = (): ReactElement => {
  const sidebarCollapsed = stateManagementZustandUI(
    (state) => state.sidebarCollapsed,
  );
  const toggleSidebar = stateManagementZustandUI(
    (state) => state.toggleSidebar,
  );

  const setLastVisitedPage = stateManagementZustandUI(
    (state) => state.setLastVisitedPage,
  );

  //cursor-pointer

  const navigate = useNavigate();
  return (
    <div className="ml-5 mt-5 mr-2 sidebar w-8/12">
      {!sidebarCollapsed && (
        <Button
          className={"p-2 border rounded w-40 text-center cursor-pointer "}
          onClick={() => toggleSidebar()}
        >
          Open side bar
        </Button>
      )}
      {sidebarCollapsed && (
        <div className="bg-gray-300 p-5 rounded w-full ">
          <Button
            className="p-2 mt-10 border rounded w-40 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/");
              setLastVisitedPage("/");
            }}
          >
            Home
          </Button>
          <Button
            className="p-2 mt-10 border rounded w-40 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/student/list");
              setLastVisitedPage("/student/list");
            }}
          >
            Student list
          </Button>
          <Button
            className="p-2 mt-10 border rounded w-40 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/book/list");
              setLastVisitedPage("/book/list");
            }}
          >
            Book list
          </Button>
          <Button
            className="p-2 mt-10 border rounded w-40 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/book/addNewBook");
              setLastVisitedPage("/book/addNewBook");
            }}
          >
            Add new Book
          </Button>
          <Button
            className="p-2 mt-10 border rounded w-40 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/user/allUsers");
              setLastVisitedPage("/user/allUsers");
            }}
          >
            Users...
          </Button>

          <Button
            className="p-2 mt-10 border rounded w-40 text-center bg-red-100 m-auto cursor-pointer"
            onClick={() => {
              toggleSidebar();
            }}
          >
            Close X
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
