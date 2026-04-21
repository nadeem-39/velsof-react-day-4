import { useEffect, useState, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
import instance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface bookDataTemplate {
  author: string;
  id: number;
  title: string;
}

const BookList = (): ReactElement => {
  let [view, setView] = useState<boolean>(true);
  let [first50BookData, setFirst50BookData] = useState<bookDataTemplate[]>();

  const {
    data: bookData,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () =>
      await instance({
        url: "/book",
        method: "get",
      }),
    queryKey: ["books"],
  });

  // const { data, isPending, error } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: async () => {
  //     const response = await fetch('/api/todos');
  //     if (!response.ok) throw new Error('Network response was not ok');
  //     return response.json();
  //   },
  // });

  // const fetchBookData = async () => {
  //   try {
  //     let response = await instance({
  //       url: "/book",
  //       method: "get",
  //     });

  //     setFirst50BookData(response.data.slice(0, 50));
  //   } catch (error: unknown) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchBookData();
  // }, []);

  useEffect(() => {
    setFirst50BookData(bookData?.data?.slice(0, 50));
  }, []);

  // console.log(typeof first50BookData);

  if (isLoading) return <span>Loading...</span>;
  console.log(error);

  return (
    <div className="mt-20 flex justify-center">
      <Card className="p-4">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-4xl font-bold">Books List</CardTitle>
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
              <TableCaption>A list of 50 books.</TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-400">
                  <TableHead className="w-100 text-center">Book ID</TableHead>
                  <TableHead className="w-100 text-center">
                    Book Author
                  </TableHead>
                  <TableHead className="w-100 text-center">
                    Book Title
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {first50BookData?.map((book) => (
                  <TableRow
                    key={book.id}
                    className={book.id & 1 ? "" : "bg-gray-300"}
                  >
                    <TableCell className="font-medium">{book.id}</TableCell>
                    <TableCell className="text-center">{book.author}</TableCell>
                    <TableCell className="text-right">{book.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        ) : (
          <p>Click above button to view Book list</p>
        )}
      </Card>
    </div>
  );
};

export default BookList;
