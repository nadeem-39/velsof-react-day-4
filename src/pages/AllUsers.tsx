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
  let [searchValue, setSearchValue] = useState<String>("");
  let [currUserData, setCurrUserData] = useState<UserDataTemplate[]>();
  let [searchUser, setSearchUser] = useState<UserDataTemplate[] | null>();
  let [searchValueInLocalStorage, setSearchValueInLocalStorage] =
    useLocalStorage("lastSearch", "");

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

  // updating User data array which is rendering in table,
  // and updatig search value inside the box via searchValue hook.
  useEffect(() => {
    setSearchValue(searchValueInLocalStorage);
  }, []);

  // search User function

  function searchUserFunction(userName: String): void {
    setSearchUser(
      currUserData?.filter(
        (s) =>
          userName !== "" &&
          s.name.toLowerCase().includes(userName.toLowerCase()),
      ),
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
            <Skeleton className="h-4 flex-1 bg-gray-300" />
            <Skeleton className="h-4 w-24 bg-gray-300" />
            <Skeleton className="h-4 w-20 bg-gray-300" />
          </div>
        ))}
      </div>
    );
  if (error) return <span>Error please try again</span>;

  return (
    <div className="place-items-center">
      <div className="mt-20 flex justify-center">
        <Card className="p-4">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-4xl font-bold">User List</CardTitle>
            <CardContent>
              <Input
                className="w-3/12"
                placeholder="Enter User Name"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue + ""}
              ></Input>
            </CardContent>

            <Button
              className="border-1-black m-auto w-25 bg-blue-500 text-white"
              onClick={() => {
                setView(!view);
              }}
            >
              {view ? "Hide list" : "View list"}{" "}
            </Button>
          </CardHeader>
          {view ? (
            <CardContent>
              <Table>
                <TableCaption>Users Table</TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-400">
                    <TableHead className="w-50 text-center">Name</TableHead>
                    <TableHead className="w-50 text-center">Email</TableHead>
                    <TableHead className="w-50 text-center">Address</TableHead>
                    <TableHead className="w-50 text-center ">
                      Go to Profile
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(searchUser && searchUser.length > 0
                    ? searchUser
                    : currUserData
                  )?.map((User) => (
                    <TableRow
                      key={User.id}
                      className={User.id & 1 ? "" : "bg-gray-300"}
                    >
                      <TableCell className="text-center">{User.name}</TableCell>
                      <TableCell
                        className="text-center"
                        onClick={() => {
                          //   showUserDetails(User.id, User.title, User.age);
                        }}
                      >
                        {User.email}
                      </TableCell>
                      <TableCell className="text-center">
                        {User.address.city}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => {
                            navigate(`/user/${User.id}`);
                          }}
                        >
                          {"->"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          ) : (
            <p>Click above button to view User list</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AllUsers;
