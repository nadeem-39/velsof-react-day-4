import { useParams } from "react-router-dom";

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

  if (isLoading) return;
  if (error) return <span>Error please try again</span>;

  return (
    <div>
      <Card className="w-9/12 m-auto mt-10">
        <CardHeader>
          <CardTitle>
            Id:
            {currStudentData?.id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          Title:
          {currStudentData?.title}
        </CardContent>
        <CardContent>
          Age:
          {currStudentData?.age}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
