import { type ReactElement } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

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

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const schema = z.object({
  id: z
    .number({
      error: (issue) =>
        issue.code === "invalid_type" ? "Enter Id properly" : "",
    })
    .min(1, "Book Id can not be less than 1")
    .max(1000000, "Book Id can not be geater than 3210"),
  author: z
    .string()
    .min(3, "Book Author name must be at least 3 characters.")
    .max(320, "Book Author name must be at most 32 characters."),
  title: z
    .string()
    .min(8, "Book Title must be at least 8 characters")
    .max(320, "Book Title must be at most 32 characters"),
});

type formSchema = z.infer<typeof schema>;

interface bookDataTemplate {
  author: string;
  id: number;
  title: string;
}

const EditBookDialog = (book: bookDataTemplate): ReactElement => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    reset,
    getFieldState,
  } = useForm<formSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const EditBookMutation = useMutation({
    mutationFn: (editBook: formSchema) =>
      instance.put(`/book/${editBook.id}`, {
        id: editBook.id,
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
      toast(`Failed to edit`, {
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

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            onClick={() => reset()}
            className={"cursor-pointer bg-white rounded text-primary"}
          >
            <i className="mdi mdi-pencil"></i>
          </button>
        }
      />
      <DialogContent className=" bg-white">
        <div className="bg-soft-primary">
          <div className="row">
            <div className="col-12">
              <div className="text-primary p-4">
                <h5 className="text-primary">Edit Book Form</h5>
                <p>Edit Book</p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="book-id">Book Id</label>

            <input
              id="book-id"
              {...register("id", {
                valueAsNumber: true,
              })}
              placeholder="Enter Book id"
              type="number"
              className="form-control"
              defaultValue={book.id}
            ></input>
            {(errors.id || getFieldState("id").invalid) && (
              <p className="text-red-500">
                {errors?.id?.message || "Id can not be less than 1"}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="book-title">Title</label>

            <input
              id="book-title"
              {...register("title")}
              placeholder="Enter Title "
              type="text"
              className="form-control"
              defaultValue={book.title}
            ></input>
            {(errors.title || getFieldState("title").invalid) && (
              <p className="text-red-500">
                {errors?.title?.message ||
                  "Book name can not be less than 8 char"}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="book-author">Author Name</label>

            <input
              id="book-author"
              {...register("author")}
              placeholder="Enter book author's name"
              className="form-control"
              type="text"
              defaultValue={book.author}
            ></input>
            {(errors.author || getFieldState("author").invalid) && (
              <p className="text-red-500">
                {errors?.author?.message ||
                  "Author name can not be less than 3 char"}
              </p>
            )}
            {errors.root?.message && <p>{errors?.author?.message}</p>}
          </div>

          <button
            className="btn btn-primary btn-block waves-effect waves-light"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {" "}
            {isSubmitting ? "Loading" : "Submit"}{" "}
          </button>
        </form>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;
