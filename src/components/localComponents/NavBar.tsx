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
  // return (
  //   <div classNameName="ml-2 mt-5 mr-2 sidebar w-8/12">
  //     {!sidebarCollapsed && (
  //       <Button
  //         classNameName={" rounded  text-left cursor-pointer"}
  //         onClick={() => toggleSidebar()}
  //       >
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="30"
  //           height="30"
  //           fill="currentColor"
  //           classNameName="bi bi-list"
  //           viewBox="0 0 16 16"
  //         >
  //           <path
  //             fill-rule="evenodd"
  //             d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
  //           />
  //         </svg>
  //       </Button>
  //     )}
  //     {sidebarCollapsed && (
  //       <div classNameName=" p-5 rounded w-full ">
  //         <Button
  //           classNameName="p-2 mt-2 rounded w-40  m-auto cursor-pointer  hover:bg-mist-600 text-center "
  //           onClick={() => {
  //             navigate("/");
  //             setLastVisitedPage("/");
  //           }}
  //         >
  //           Home
  //         </Button>
  //         <Button
  //           classNameName="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
  //           onClick={() => {
  //             navigate("/student/list");
  //             setLastVisitedPage("/student/list");
  //           }}
  //         >
  //           Student list
  //         </Button>
  //         <Button
  //           classNameName={`p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer `}
  //           onClick={() => {
  //             navigate("/book/list");
  //             setLastVisitedPage("/book/list");
  //           }}
  //         >
  //           Book list
  //         </Button>
  //         <Button
  //           classNameName="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
  //           onClick={() => {
  // navigate("/book/addNewBook");
  // setLastVisitedPage("/book/addNewBook");
  //           }}
  //         >
  //           Add new Book
  //         </Button>
  //         <Button
  //           classNameName="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
  //           onClick={() => {
  //             navigate("/user/allUsers");
  //             setLastVisitedPage("/user/allUsers");
  //           }}
  //         >
  //           Users...
  //         </Button>
  //         <Button
  //           classNameName="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
  //           onClick={() => {
  //             navigate("/notes/list");
  //             setLastVisitedPage("/notes/list");
  //           }}
  //         >
  //           Notes List
  //         </Button>

  //         <Button
  //           classNameName="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
  //           onClick={() => {
  //             navigate("/notes/addNewNote");
  //             setLastVisitedPage("/notes/addNewNote");
  //           }}
  //         >
  //           Notes Form
  //         </Button>

  //         <Button
  //           classNameName="p-2 mt-2  rounded w-40 hover:bg-mist-600 text-center m-auto cursor-pointer"
  //           onClick={() => {
  //             toggleSidebar();
  //           }}
  //         >
  //           Close X
  //         </Button>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100 bg-gray-800">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled " id="side-menu">
            <li className="max-w-50">
              <a className="waves-effect max-w-50">
                <Button
                  className=" text-gray-300 hover:text-gray-100"
                  onClick={() => {
                    navigate("/");
                    setLastVisitedPage("/");
                  }}
                >
                  <i className="mdi mdi-file-document-box-outline"></i>
                  <span>Home</span>
                </Button>
              </a>
            </li>
            <li className="max-w-50">
              <a className="waves-effect max-w-50">
                <Button
                  className=" text-gray-300 hover:text-gray-100"
                  onClick={() => {
                    navigate("/student/list");
                    setLastVisitedPage("/student/list");
                  }}
                >
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>Student List</span>
                </Button>
              </a>
            </li>
            <li className="max-w-50">
              <a className="waves-effect max-w-50">
                <Button
                  className=" text-gray-300 hover:text-gray-100"
                  onClick={() => {
                    navigate("/book/list");
                    setLastVisitedPage("/book/list");
                  }}
                >
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>Book List</span>
                </Button>
              </a>
            </li>
            <li className="max-w-50">
              <a className="waves-effect max-w-50">
                <Button
                  className=" text-gray-300 hover:text-gray-100"
                  onClick={() => {
                    navigate("/book/addNewBook");
                    setLastVisitedPage("/book/addNewBook");
                  }}
                >
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>Add Book</span>
                </Button>
              </a>
            </li>
            <li className="max-w-50">
              <a className="waves-effect max-w-50">
                <Button
                  className=" text-gray-300 hover:text-gray-100"
                  onClick={() => {
                    navigate("/user/allUsers");
                    setLastVisitedPage("/user/allUsers");
                  }}
                >
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>Users</span>
                </Button>
              </a>
            </li>
            <li className="max-w-50">
              <a className="waves-effect max-w-50">
                <Button
                  className=" text-gray-300 hover:text-gray-100"
                  onClick={() => {
                    navigate("/notes/list");
                    setLastVisitedPage("/notes/list");
                  }}
                >
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>Notes List</span>
                </Button>
              </a>
            </li>
            <li className="max-w-50">
              <a className="waves-effect max-w-50">
                <Button
                  className=" text-gray-300 hover:text-gray-100"
                  onClick={() => {
                    navigate("/notes/addNewNote");
                    setLastVisitedPage("/notes/addNewNote");
                  }}
                >
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>Add Note</span>
                </Button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
