import { useEffect, useState, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import instance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const schema = z.object({
  id: z
    .number()
    .min(1, "Book Id can not be less than 1")
    .max(1000000, "Book Id can not be geater than 3210"),
  author: z
    .string()
    .min(3, "Book Author name must be at least 3 characters.")
    .max(32, "Book Author name must be at most 32 characters."),
  title: z
    .string()
    .min(8, "Book Title must be at least 8 characters")
    .max(32, "Book Title must be at most 32 characters"),
});

type formSchema = z.infer<typeof schema>;

interface bookDataTemplate {
  author: string;
  id: number;
  title: string;
}

const BookList = (): ReactElement => {
  const queryClient = useQueryClient();
  let [view, setView] = useState<boolean>(true);
  let [first50BookData, setFirst50BookData] = useState<bookDataTemplate[]>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<formSchema>({
    resolver: zodResolver(schema),
  });

  const EditBookMutation = useMutation({
    mutationFn: (editBook: formSchema) =>
      instance.put(`/book/${editBook.id}`, {
        id: String(editBook.id),
        author: editBook.author,
        title: editBook.title,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast(`Successfully Edited`, {
        position: "top-center",
      });
      reset();
    },

    onError: () => {
      toast(`Field to edit`, {
        position: "top-center",
      });
    },
  });

  const onSubmit: SubmitHandler<formSchema> = async (data) => {
    console.log("your form is submitting");

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      EditBookMutation.mutate(data);
    } catch (error) {
      setError("root", { message: "Error in Book ID" });
    }
  };

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

  const deleteStudentMutatation = useMutation({
    mutationFn: (id: Number) => instance.delete(`/book/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast(`Successfully deleted`, {
        position: "top-center",
      });
    },

    onError: () => {
      toast(`Could not delete`, {
        position: "top-center",
      });
    },
  });

  useEffect(() => {
    if (bookData) {
      bookData.data.sort(
        (a: bookDataTemplate, b: bookDataTemplate) => a.id - b.id,
      );
      setFirst50BookData(bookData.data.slice(0, 50));
    }
  }, [bookData]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error please try again</span>;

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

                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger
                          render={
                            <Button onClick={() => reset()} variant="outline">
                              Open Dialog
                            </Button>
                          }
                        />
                        <DialogContent className="sm:max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Edit Book </DialogTitle>
                            <DialogDescription>
                              Make changes in Book Data
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <FieldGroup>
                              <Field>
                                <FieldLabel htmlFor="book-id">
                                  Book ID
                                </FieldLabel>
                                <Input
                                  id="book-id"
                                  {...register("id", { valueAsNumber: true })}
                                  placeholder="Enter Book id"
                                  type="number"
                                  defaultValue={book.id}
                                ></Input>
                                {errors.root?.message && (
                                  <FieldError className="text-red-500">
                                    {errors?.id?.message ||
                                      "Id can not be less than 1"}
                                  </FieldError>
                                )}
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="book-title">
                                  Book Title
                                </FieldLabel>
                                <Input
                                  id="book-title"
                                  {...register("title")}
                                  placeholder="Enter Title "
                                  type="text"
                                  defaultValue={book.title}
                                ></Input>
                                {errors.root?.message && (
                                  <FieldError className="text-red-500">
                                    {errors?.title?.message ||
                                      "Book name can not be less than 8 char"}
                                  </FieldError>
                                )}
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="book-author">
                                  Author Name
                                </FieldLabel>
                                <Input
                                  id="book-author"
                                  {...register("author")}
                                  placeholder="Enter book author's name"
                                  title="text"
                                  defaultValue={book.author}
                                ></Input>
                                {errors.root?.message && (
                                  <FieldError className="text-red-500">
                                    {errors?.author?.message ||
                                      "Author name can not be less than 3 char"}
                                  </FieldError>
                                )}
                                {errors.root?.message && (
                                  <FieldError>
                                    {errors?.author?.message}
                                  </FieldError>
                                )}
                              </Field>
                            </FieldGroup>
                            <Button
                              type="submit"
                              className={
                                "bg-blue-500 p-2 border-black text-white mt-4"
                              }
                            >
                              Save changes
                            </Button>
                          </form>
                          <DialogFooter>
                            <DialogClose
                              render={<Button variant="outline">Cancel</Button>}
                            />
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger
                          key={book.id}
                          className="  border p-2 pl-5 pr-5 rounded"
                          onClick={() => {}}
                        >
                          Delete
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete {book.title}
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteStudentMutatation.mutate(book.id);
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
          <p>Click above button to view Book list</p>
        )}
      </Card>
    </div>
  );
};

export default BookList;
