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
    formState: { errors },
    setError,
    reset,
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
          <Button onClick={() => reset()} className={"cursor-pointer"}>
            ✏️
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm bg-white">
        <DialogHeader>
          <DialogTitle>Edit Book </DialogTitle>
          <DialogDescription>Make changes in Book Data</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="book-id">Book ID</FieldLabel>
              <Input
                id="book-id"
                {...register("id", { valueAsNumber: true })}
                placeholder="Enter Book id"
                type="number"
                defaultValue={book.id}
              ></Input>
              {errors.id && (
                <FieldError className="text-red-500">
                  {errors?.id?.message || "Id can not be less than 1"}
                </FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="book-title">Book Title</FieldLabel>
              <Input
                id="book-title"
                {...register("title")}
                placeholder="Enter Title "
                type="text"
                defaultValue={book.title}
              ></Input>
              {errors.title && (
                <FieldError className="text-red-500">
                  {errors?.title?.message ||
                    "Book name can not be less than 8 char"}
                </FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="book-author">Author Name</FieldLabel>
              <Input
                id="book-author"
                {...register("author")}
                placeholder="Enter book author's name"
                type="text"
                defaultValue={book.author}
              ></Input>
              {errors.author && (
                <FieldError className="text-red-500">
                  {errors?.author?.message ||
                    "Author name can not be less than 3 char"}
                </FieldError>
              )}
              {errors.root && <FieldError>{errors?.root?.message}</FieldError>}
            </Field>
          </FieldGroup>
          <Button
            type="submit"
            className={"bg-blue-500 p-2 border-black text-white mt-4"}
          >
            Save changes
          </Button>
        </form>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;
