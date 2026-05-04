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
    <div className="ml-2 mt-5 mr-2 sidebar w-8/12">
      {!sidebarCollapsed && (
        <Button
          className={" rounded  text-left cursor-pointer"}
          onClick={() => toggleSidebar()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </Button>
      )}
      {sidebarCollapsed && (
        <div className=" p-5 rounded w-full ">
          <Button
            className="p-2 mt-2 rounded w-40  m-auto cursor-pointer  hover:bg-mist-600 text-center "
            onClick={() => {
              navigate("/");
              setLastVisitedPage("/");
            }}
          >
            Home
          </Button>
          <Button
            className="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/student/list");
              setLastVisitedPage("/student/list");
            }}
          >
            Student list
          </Button>
          <Button
            className={`p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer `}
            onClick={() => {
              navigate("/book/list");
              setLastVisitedPage("/book/list");
            }}
          >
            Book list
          </Button>
          <Button
            className="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/book/addNewBook");
              setLastVisitedPage("/book/addNewBook");
            }}
          >
            Add new Book
          </Button>
          <Button
            className="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/user/allUsers");
              setLastVisitedPage("/user/allUsers");
            }}
          >
            Users...
          </Button>
          <Button
            className="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/notes/list");
              setLastVisitedPage("/notes/list");
            }}
          >
            Notes List
          </Button>

          <Button
            className="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
            onClick={() => {
              navigate("/notes/addNewNote");
              setLastVisitedPage("/notes/addNewNote");
            }}
          >
            Notes Form
          </Button>

          <Button
            className="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
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
