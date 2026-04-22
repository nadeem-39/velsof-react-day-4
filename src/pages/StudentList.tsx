import { useEffect, useState, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";

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
type StudentDataTemplate = {
  id: number;
  title: string;
  age: number;
};

const StudentList = (): ReactElement => {
  let [view, setView] = useState<boolean>(true);
  let [searchValue, setSearchValue] = useState<String>("");
  let [currStudentData, setCurrStudentData] = useState<StudentDataTemplate[]>();
  let [searchStudent, setSearchStudent] = useState<
    StudentDataTemplate[] | null
  >();
  let [searchValueInLocalStorage, setSearchValueInLocalStorage] =
    useLocalStorage("lastSearch", "");

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

  // updating student data array which is rendering in table,
  // and updatig search value inside the box via searchValue hook.
  useEffect(() => {
    setSearchValue(searchValueInLocalStorage);
  }, []);

  let [studentVisible, setStudentVisible] =
    useState<StudentDataTemplate | null>(null);

  const showStudentDetails = (id: number, title: string, age: number): void => {
    setStudentVisible({ id, title, age });
    console.log(studentVisible);
  };

  // search student function

  function searchStudentFunction(studentName: String): void {
    setSearchStudent(
      currStudentData?.filter(
        (s) =>
          studentName !== "" &&
          s.title.toLowerCase().includes(studentName.toLowerCase()),
      ),
    );
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchStudentFunction(searchValue);
      setSearchValueInLocalStorage(() => searchValue + "");
      console.log(searchValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error please try again</span>;

  return (
    <div className="place-items-center">
      <div>
        {studentVisible && view && (
          <Card className="fixed top-4/12 left-140 z-50 w-95 bg-white p-20">
            <CardHeader className="">
              <CardTitle className="font-bold">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              Student ID: &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {studentVisible.id}
            </CardContent>
            <CardContent className="p-0">
              Student Name: &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {studentVisible.title}{" "}
            </CardContent>
            <CardContent className="p-0">
              Student Age: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {studentVisible.age}{" "}
            </CardContent>
            <Button
              className="bg-blue-500 text-white"
              onClick={() => {
                setStudentVisible(null);
              }}
            >
              Close
            </Button>
          </Card>
        )}
      </div>
      <div className="mt-20 flex justify-center">
        <Card className="p-4">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-4xl font-bold">Students List</CardTitle>
            <CardContent>
              <Input
                className="w-3/12"
                placeholder="Enter Student Name"
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
                <TableCaption>A list of 50 Students.</TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-400">
                    <TableHead className="w-50 text-center">
                      Student ID
                    </TableHead>
                    <TableHead className="w-50 text-center">
                      Student Name
                    </TableHead>
                    <TableHead className="w-50 text-center">
                      Student Age
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(searchStudent && searchStudent?.length > 0
                    ? searchStudent
                    : currStudentData
                  )?.map((student) => (
                    <TableRow
                      key={student.id}
                      className={student.id & 1 ? "" : "bg-gray-300"}
                    >
                      <TableCell className="text-center">
                        {student.id}
                      </TableCell>
                      <TableCell
                        className="text-center"
                        onClick={() => {
                          showStudentDetails(
                            student.id,
                            student.title,
                            student.age,
                          );
                        }}
                      >
                        {student.title}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.age}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          ) : (
            <p>Click above button to view Student list</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StudentList;
