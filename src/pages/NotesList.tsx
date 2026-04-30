import { useEffect, useState, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { notesInstance } from "@/lib/api";
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
type NotesDataTemplate = {
  title: string;
  content: string;
};

const NotesList = (): ReactElement => {
  let [view, setView] = useState<boolean>(true);
  let [currNotesData, setCurrNotesData] = useState<NotesDataTemplate[]>();
  let [searchNotes, setSearchNotes] = useState<NotesDataTemplate[]>([]);
  let [searchValueInLocalStorage, setSearchValueInLocalStorage] =
    useLocalStorage("lastSearchNotes", "");
  let [searchValue, setSearchValue] = useState<string>(
    searchValueInLocalStorage || "",
  );

  const {
    data: notesData,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () =>
      await notesInstance({
        url: "/",
        method: "get",
      }),
    queryKey: ["notes"],
  });

  useEffect(() => {
    if (notesData) {
      setCurrNotesData(notesData.data);
    }
  }, [notesData]);

  // search notes function

  function searchNotesFunction(notesTitle: string): void {
    setSearchNotes(
      currNotesData?.filter(
        (n) =>
          notesTitle !== "" &&
          n.title.toLowerCase().includes(notesTitle.toLowerCase()),
      ) || [],
    );
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchNotesFunction(searchValue);
      setSearchValueInLocalStorage(() => searchValue);
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
        <Card className="p-4 w-full">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-4xl font-bold">Notes List</CardTitle>
            <CardContent>
              <Input
                className=""
                placeholder="Enter Student Name"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue + ""}
              ></Input>
            </CardContent>

            <Button
              className="border-1-black m-auto w-25 bg-blue-500 text-white cursor-pointer"
              onClick={() => {
                setView(!view);
              }}
            >
              {view ? "Hide list" : "View list"}{" "}
            </Button>
          </CardHeader>
          {searchValue && searchNotes.length == 0 ? (
            <p>No Student matched your search.</p>
          ) : view ? (
            <>
              {searchValue && (
                <p>
                  Showing {searchNotes.length} of {currNotesData?.length}{" "}
                </p>
              )}
              <CardContent>
                <Table>
                  <TableCaption>A list of Notes.</TableCaption>
                  <TableHeader>
                    <TableRow className="bg-gray-400">
                      <TableHead className="w-50 text-center">Title</TableHead>
                      <TableHead className="w-50 text-center">
                        Content
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(searchValue ? searchNotes : currNotesData)?.map(
                      (note, idx) => (
                        <TableRow
                          key={note.title}
                          className={idx & 1 ? "" : "bg-gray-300"}
                        >
                          <TableCell className="text-right">
                            {note.title}
                          </TableCell>
                          <TableCell className="text-right">
                            {note.content}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </>
          ) : (
            <p>Click above button to view Student list</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default NotesList;
