import { useParams } from "react-router-dom";

type UserParams = {
  userId: string;
};
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { userInstance } from "@/lib/api";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

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

const UserAccount = () => {
  let { userId } = useParams<UserParams>();
  let [currPostData, setCurrPostData] = useState<Post[]>();
  let [currUserData, setCurrUserData] = useState<UserDataTemplate>();
  const { data: userData } = useQuery({
    queryFn: async () =>
      await userInstance({
        url: `/users/${userId}`,
        method: "get",
      }),
    queryKey: ["user"],
  });

  useEffect(() => {
    if (userData) {
      setCurrUserData(userData.data);
    }
  }, [userData]);

  const {
    data: userPosts,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () =>
      await userInstance({
        url: `/posts?userId=${userId}`,
        method: "get",
      }),
    queryKey: ["userPosts"],
  });

  useEffect(() => {
    if (userPosts) {
      setCurrPostData(userPosts.data);
    }
  }, [userPosts]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error please try again</span>;

  //   console.log(userPosts?.data);

  return (
    // <div>
    //   <Card className="w-200 m-auto mt-10 ring-0 bg-gray-200">
    //     <CardHeader>
    //       <CardTitle>{currUserData?.name}</CardTitle>
    //       <CardDescription>
    //         Total count of Post is {currPostData && currPostData.length}{" "}
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <Table>
    //         <TableCaption>Post Table</TableCaption>
    //         <TableHeader>
    //           <TableRow className="bg-gray-400">
    //             <TableHead className="w-80 text-center">Post Title</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {currPostData?.map((post: Post) => (
    //             <TableRow
    //               key={post.id}
    //               className={post.id & 1 ? "" : "bg-gray-300"}
    //             >
    //               <TableCell className="text-center">{post.title}</TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </CardContent>
    //   </Card>
    // </div>

    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">User Profile</h4>
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
                    <h4 className="card-title">{currUserData?.name}</h4>
                    <h4 className="card-title">
                      Total Post {currPostData?.length}
                    </h4>
                  </div>
                </div>
              </div>

              <table
                className="table mb-0 listingData dt-responsive"
                id="datatable"
              >
                <thead>
                  <tr>
                    <th className="text-center">User Posts</th>
                  </tr>
                </thead>
                <tbody>
                  {currPostData?.map((post: Post) => (
                    <tr key={post.id}>
                      <td className="text-center">{post.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
