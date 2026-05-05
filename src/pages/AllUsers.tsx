import { useEffect, useState, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { userInstance } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

type UserDataTemplate = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lan: string;
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  };
};

const AllUsers = (): ReactElement => {
  let navigate = useNavigate();
  let [view, setView] = useState<boolean>(true);

  let [currUserData, setCurrUserData] = useState<UserDataTemplate[]>();
  let [searchUser, setSearchUser] = useState<UserDataTemplate[]>([]);
  let [searchValueInLocalStorage, setSearchValueInLocalStorage] =
    useLocalStorage("lastSearchUser", "");
  let [searchValue, setSearchValue] = useState<string>(
    searchValueInLocalStorage || "",
  );

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () =>
      await userInstance({
        url: "/users",
        method: "get",
      }),
    queryKey: ["users"],
  });

  useEffect(() => {
    if (userData) {
      setCurrUserData(userData.data);
    }
  }, [userData]);

  // search User function

  function searchUserFunction(userName: string): void {
    setSearchUser(
      currUserData?.filter(
        (s) =>
          userName !== "" &&
          s.name.toLowerCase().includes(userName.toLowerCase()),
      ) || [],
    );
  }

  // debouncing function for search value
  useEffect(() => {
    const timeout = setTimeout(() => {
      searchUserFunction(searchValue);
      setSearchValueInLocalStorage(() => searchValue + "");
      console.log(searchValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  if (isLoading)
    return (
      <div className="flex  m-auto w-9/12 mt-50 flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex gap-4" key={index}>
            <Skeleton className="h-4 flex-1 bg-gray-400" />
            <Skeleton className="h-4 w-24 bg-gray-400" />
            <Skeleton className="h-4 w-20 bg-gray-400" />
          </div>
        ))}
      </div>
    );
  if (error) return <span>Error please try again</span>;

  // return (
  //   <div className="place-items-center">
  //     <div className="flex justify-center ">
  //       <Card className="p-4 ring-0 w-250 bg-gray-100">
  //         <CardHeader className="items-center text-center">
  //           <CardTitle className="text-4xl font-bold">User List</CardTitle>

  //           <CardContent className="flex justify-between">
  //             <Input
  //               className="w-50 border-gray-300"
  //               placeholder="Enter User Name"
  //               onChange={(e) => {
  //                 setSearchValue(e.target.value);
  //               }}
  //               value={searchValue + ""}
  //             ></Input>
  //             <Button
  //               className=" w-25 bg-blue-500 text-white cursor-pointer"
  //               onClick={() => {
  //                 setView(!view);
  //               }}
  //             >
  //               {view ? "Hide list" : "View list"}{" "}
  //             </Button>
  //           </CardContent>
  //         </CardHeader>
  //         {searchValue && searchUser.length == 0 ? (
  //           <p>No User matched your search.</p>
  //         ) : view ? (
  //           <>
  //             {searchValue && (
  //               <p>
  //                 Showing {searchUser.length} of {currUserData?.length}{" "}
  //               </p>
  //             )}

  //             <CardContent>
  //               <Table>
  //                 <TableCaption>Users Table</TableCaption>
  //                 <TableHeader>
  //                   <TableRow className="bg-black text-white">
  //                     <TableHead className="w-50 text-center">Name</TableHead>
  //                     <TableHead className="w-50 text-center">Email</TableHead>
  //                     <TableHead className="w-50 text-center">
  //                       Address
  //                     </TableHead>
  //                     <TableHead className="w-50 text-center ">
  //                       Go to Profile
  //                     </TableHead>
  //                   </TableRow>
  //                 </TableHeader>
  //                 <TableBody>
  //                   {(searchValue ? searchUser : currUserData)?.map((User) => (
  //                     <TableRow key={User.id} className="border-gray-200">
  //                       <TableCell className="text-center">
  //                         {User.name}
  //                       </TableCell>
  //                       <TableCell
  //                         className="text-center"
  //                         onClick={() => {
  //                           //   showUserDetails(User.id, User.title, User.age);
  //                         }}
  //                       >
  //                         {User.email}
  //                       </TableCell>
  //                       <TableCell className="text-center">
  //                         {User.address.city}
  //                       </TableCell>
  //                       <TableCell className="text-center">
  //                         <Button
  //                           onClick={() => {
  //                             navigate(`/user/${User.id}`);
  //                           }}
  //                         >
  //                           🗂️
  //                         </Button>
  //                       </TableCell>
  //                     </TableRow>
  //                   ))}
  //                 </TableBody>
  //               </Table>
  //             </CardContent>
  //           </>
  //         ) : (
  //           <p>Click above button to view User list</p>
  //         )}
  //       </Card>
  //     </div>
  //   </div>
  // );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Users List</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Filter</h5>

              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <label className="sr-only">Search</label>
                  <div className="input-group mb-2 mr-sm-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="mdi mdi-magnify"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormSearchl2"
                      placeholder="Enter Student Name"
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                      }}
                      value={searchValue + ""}
                    />
                  </div>
                </div>

                <div className="col-lg-8 col-md-8 text-right">
                  <button
                    className=" w-25 btn btn-primary"
                    onClick={() => {
                      setView(!view);
                    }}
                  >
                    {view ? "Hide list" : "View list"}{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="TableHeader">
                <div className="row">
                  <div className="col-lg-3">
                    <h4 className="card-title">Users</h4>
                  </div>
                </div>
              </div>
              {searchValue && searchUser.length == 0 ? (
                <p>No User matched your search.</p>
              ) : view ? (
                <>
                  {searchValue && (
                    <p>
                      Showing {searchUser.length} of {currUserData?.length}{" "}
                    </p>
                  )}
                  <div className="table-responsive">
                    <table
                      className="table mb-0 listingData dt-responsive"
                      id="datatable"
                    >
                      <thead>
                        <tr>
                          <th className="text-center">Name</th>
                          <th className="text-center">Email</th>
                          <th className="text-center">Address</th>
                          <th className="text-center">Go to profile</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(searchValue ? searchUser : currUserData)?.map(
                          (User) => (
                            <tr
                              key={User.id}
                              className="border-gray-200"
                              // className={User.id & 1 ? "" : "bg-gray-300 "}
                            >
                              <td className="text-center">{User.name}</td>
                              <td className="text-center">{User.email}</td>
                              <td className={`text-center `}>
                                {User.address.city}
                              </td>
                              <td className="text-center cursor-pointer">
                                <button
                                  className={"bg-gray-50 rounded"}
                                  onClick={() => {
                                    navigate(`/user/${User.id}`);
                                  }}
                                >
                                  🗂️
                                </button>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <p>Click above button to view User list</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
