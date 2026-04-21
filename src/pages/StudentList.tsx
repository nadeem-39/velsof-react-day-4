import { useEffect, useState, type ReactElement } from "react"
import * as SutdentData from "../data/studentsList.json"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocalStorage } from "usehooks-ts"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import DialogComponent from "@/components/localComponents/StudentEditDialog"
import { Input } from "@/components/ui/input"
import { string } from "zod"

type StudentDataTemplate = {
  id: number
  title: string
  age: number
}

const StudentList = (): ReactElement => {
  let [view, setView] = useState<boolean>(true)
  let [studentForEdit, setStudentForEdit] =
    useState<StudentDataTemplate | null>(null)
  let [open, setOpen] = useState<boolean>(false)
  let [searchValue, setSearchValue] = useState<String>("")
  let [currStudentData, setCurrStudentData] = useState<StudentDataTemplate[]>()
  let [searachStudent, setSearchStudent] = useState<
    StudentDataTemplate[] | null
  >()
  let [
    searchValueInLocalStorage,
    setSearchValueInLocalStorage,
    removeSearchValueInLocalStorage,
  ] = useLocalStorage("lastSearch", "")

  let processedData = JSON.stringify(SutdentData)
  let allData = JSON.parse(processedData)
  let finalData: StudentDataTemplate[] = allData.data

  let first50StudentData = finalData.slice(0, 50)

  // updating student data array which is rendering in table,
  // and updatig search value inside the box via searchValue hook.
  useEffect(() => {
    setCurrStudentData(first50StudentData)
    setSearchValue(searchValueInLocalStorage)
  }, [])

  function deleteStudent(student: StudentDataTemplate): void {
    setCurrStudentData(
      currStudentData?.filter((s) => (s.id === student.id ? false : true))
    )
  }

  let [studentVisible, setStudentVisible] =
    useState<StudentDataTemplate | null>(null)

  const showStudentDetails = (id: number, title: string, age: number): void => {
    setStudentVisible({ id, title, age })
    console.log(studentVisible)
  }

  // searach student function

  function searchStudent(studentName: String): void {
    setSearchStudent(
      currStudentData?.filter(
        (s) => s.title.toLowerCase() === studentName.toLowerCase()
      )
    )
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchStudent(searchValue)
      setSearchValueInLocalStorage(() => searchValue + "")
      console.log(searchValue)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchValue])

  //   console.log(first50SutdentData);

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
                setStudentVisible(null)
              }}
            >
              Close
            </Button>
          </Card>
        )}
      </div>
      <div className="dialog-for-edit">
        {studentForEdit && (
          <DialogComponent
            {...{
              id: studentForEdit.id,
              title: studentForEdit.title,
              age: studentForEdit.age,
              open: open,
              setOpen: setOpen,
            }}
          />
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
                  setSearchValue(e.target.value)
                }}
                value={searchValue + ""}
              ></Input>
            </CardContent>
            {/* may be two student with same name  */}
            {searachStudent?.map((e, idx) => {
              return (
                <CardContent key={idx}>
                  name: {e.title} &nbsp; &nbsp; id: {e.id} &nbsp; &nbsp; age:{" "}
                  {e.age}
                </CardContent>
              )
            })}

            <Button
              className="border-1-black m-auto w-25 bg-blue-500 text-white"
              onClick={() => {
                setView(!view)
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
                    <TableHead className="w-50 text-center">
                      Edit Button
                    </TableHead>
                    <TableHead className="w-50 text-center">
                      Delete Button
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {first50StudentData.map((student) => (
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
                            student.age
                          )
                        }}
                      >
                        {student.title}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.age}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          key={student.id}
                          className="bg-green-500 text-white"
                          onClick={() => {
                            setStudentForEdit({
                              id: student.id,
                              title: student.title,
                              age: student.age,
                            })
                            setOpen(true)

                            console.log(student)
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button
                              key={student.id}
                              className="bg-red-800 text-white"
                              onClick={() => {}}
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete {student.title}
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  deleteStudent(student)
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
  )
}

export default StudentList
