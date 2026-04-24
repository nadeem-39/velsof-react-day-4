import { useEffect, useState, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteBookDialog from "@/components/localComponents/DeleteBookDialog";
import EditBookDialog from "@/components/localComponents/EditBookDialog";

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

  useEffect(() => {
    if (bookData) {
      bookData.data.sort(
        (a: bookDataTemplate, b: bookDataTemplate) => a.id - b.id,
      );
      setFirst50BookData(bookData.data.slice(0, 50));
    }
  }, [bookData]);

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
    <div className="mt-20 flex justify-center">
      <Card className="p-4">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-4xl font-bold">Books List</CardTitle>
          <Button
            className="border-1-black m-auto w-25 bg-blue-500 text-white cursor-pointer"
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
                  <TableHead className="w-50 text-center">Book ID</TableHead>
                  <TableHead className="w-50 text-center">
                    Book Author
                  </TableHead>
                  <TableHead className="w-50 text-center">Book Title</TableHead>
                  <TableHead className="w-50 text-center">Edit Book</TableHead>
                  <TableHead className="w-50 text-center">
                    Delete Book
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

                    <TableCell className="text-center ">
                      <EditBookDialog {...book} />
                    </TableCell>
                    <TableCell className="text-center ">
                      <DeleteBookDialog {...book} />
                    </TableCell>
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
