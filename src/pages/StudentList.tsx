import { useEffect, useState, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
type StudentDataTemplate = {
  id: number;
  title: string;
  age: number;
};

const StudentList = (): ReactElement => {
  let [view, setView] = useState<boolean>(true);
  let navigate = useNavigate();
  let [currStudentData, setCurrStudentData] = useState<StudentDataTemplate[]>();
  let [searchStudent, setSearchStudent] = useState<StudentDataTemplate[]>([]);
  let [searchValueInLocalStorage, setSearchValueInLocalStorage] =
    useLocalStorage("lastSearchStudent", "");
  let [searchValue, setSearchValue] = useState<string>(
    searchValueInLocalStorage || "",
  );

  const {
    data: studentData,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () =>
      await instance({
        url: "/student",
        method: "get",
      }),
    queryKey: ["students"],
  });

  useEffect(() => {
    if (studentData) {
      setCurrStudentData(studentData.data.slice(0, 50));
    }
  }, [studentData]);

  // search student function

  function searchStudentFunction(studentName: string): void {
    setSearchStudent(
      currStudentData?.filter(
        (s) =>
          studentName !== "" &&
          s.title.toLowerCase().includes(studentName.toLowerCase()),
      ) || [],
    );
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchStudentFunction(searchValue);
      setSearchValueInLocalStorage(() => searchValue);
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
      <div className="mt-5 flex justify-center">
        <Card className="p-4 w-250 ring-0 bg-gray-100">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-4xl font-bold">Students List</CardTitle>
            <CardContent className="flex justify-between">
              <Input
                className="w-50 border-gray-300"
                placeholder="Enter Student Name"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue + ""}
              ></Input>
              <Button
                className=" w-25 bg-blue-500 text-white cursor-pointer"
                onClick={() => {
                  setView(!view);
                }}
              >
                {view ? "Hide list" : "View list"}{" "}
              </Button>
            </CardContent>
          </CardHeader>
          {searchValue && searchStudent.length == 0 ? (
            <p>No Student matched your search.</p>
          ) : view ? (
            <>
              {searchValue && (
                <p>
                  Showing {searchStudent.length} of{" "}
                  {currStudentData?.length}{" "}
                </p>
              )}
              <CardContent className="overflow-y-auto h-full">
                <Table>
                  <TableHeader className="sticky top-0 ">
                    <TableRow className="bg-black text-white">
                      <TableHead className="w-50 text-center">
                        Student ID
                      </TableHead>
                      <TableHead className="w-50 text-center">
                        Student Name
                      </TableHead>
                      <TableHead className="w-50 text-center">
                        Student Age
                      </TableHead>
                      <TableHead className="w-50 text-center">View</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(searchValue ? searchStudent : currStudentData)?.map(
                      (student) => (
                        <TableRow
                          key={student.id}
                          className="border-gray-200"
                          // className={student.id & 1 ? "" : "bg-gray-300 "}
                        >
                          <TableCell className="text-center">
                            {student.id}
                          </TableCell>
                          <TableCell className="text-center">
                            {student.title}
                          </TableCell>
                          <TableCell className={`text-center `}>
                            {student.age}
                          </TableCell>
                          <TableCell
                            className="text-center cursor-pointer"
                            onClick={() => {
                              navigate(`/student/${student.id}`);
                            }}
                          >
                            <Button
                              className={
                                "bg-green-500 text-white w-10 h-5 text-xs"
                              }
                            >
                              {" "}
                              view
                            </Button>
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <p className="text-center">A list of 50 students</p>
            </>
          ) : (
            <p>Click above button to view Student list</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StudentList;
