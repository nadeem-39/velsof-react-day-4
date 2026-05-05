import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/api";

type StudentDataTemplate = {
  id: number;
  title: string;
  age: number;
};

type StudentParams = {
  studentId: string;
};

const StudentProfile = () => {
  let { studentId } = useParams<StudentParams>();
  let [currStudentData, setCurrStudentData] = useState<StudentDataTemplate>();
  const {
    data: studentData,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () =>
      await instance({
        url: `student/${studentId}`,
        method: "get",
      }),
    queryKey: ["IndividualStudent"],
  });

  useEffect(() => {
    if (studentData) {
      setCurrStudentData(studentData.data);
    }
  }, [studentData]);

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-8">
          <div className="card overflow-hidden">
            <div className="bg-soft-primary">
              <div className="row">
                <div className="col-12">
                  <div className="text-primary p-4">
                    <h5 className="text-primary">Student Information</h5>
                    <p>Find student Information below</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pt-0">
              <div className="p-4"> Student Id: {currStudentData?.id}</div>
              <div className="p-4"> Student Name: {currStudentData?.title}</div>
              <div className="p-4"> Student Age: {currStudentData?.age}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
