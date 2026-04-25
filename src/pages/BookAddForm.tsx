import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/lib/api";

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
    .max(32, "Book Author name must be at most 32 characters."),
  title: z
    .string()
    .min(8, "Book Title must be at least 8 characters")
    .max(32, "Book Title must be at most 32 characters"),
});

type formSchema = z.infer<typeof schema>;

const BookAddForm = () => {
  const { register, handleSubmit, formState, setError, getFieldState, reset } =
    useForm<formSchema>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit: SubmitHandler<formSchema> = async (data) => {
    // toast("Your form in under submit");

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      addBookMutation.mutate(data);
    } catch (error) {
      setError("root", { message: "Error in Book ID" });
    }
  };

  const queryClient = useQueryClient();

  const addBookMutation = useMutation({
    mutationFn: (newBook: formSchema) =>
      instance.post(`/book`, {
        id: String(newBook.id),
        author: newBook.author,
        title: newBook.title,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book added successfully");
      reset();
    },

    onError: () => {
      toast.error("Failed to add book");
    },
  });

  return (
    <div className="mt-10 flex justify-center text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardContent className="font-bold">Book Form</CardContent>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldDescription>Fill all the required details</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="book-id">Book ID</FieldLabel>
                  <Input
                    id="book-id"
                    {...register("id", {
                      valueAsNumber: true,
                    })}
                    placeholder="Enter Book id"
                    type="number"
                  ></Input>
                  {(formState.errors.root?.message ||
                    getFieldState("id").invalid) && (
                    <FieldError className="text-red-500">
                      {formState.errors?.id?.message ||
                        "Id can not be less than 1"}
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
                  ></Input>
                  {(formState.errors.root?.message ||
                    getFieldState("title").invalid) && (
                    <FieldError className="text-red-500">
                      {formState.errors?.title?.message ||
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
                  ></Input>
                  {(formState.errors.root?.message ||
                    getFieldState("author").invalid) && (
                    <FieldError className="text-red-500">
                      {formState.errors?.author?.message ||
                        "Author name can not be less than 3 char"}
                    </FieldError>
                  )}
                  {formState.errors.root?.message && (
                    <FieldError>{formState.errors?.author?.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldGroup>
            <Button
              className="border-1-black mt-5 mr-10 w-25 bg-blue-500 text-white"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
            <Button
              className="border-1-black mt-5 w-25 bg-blue-500 text-white"
              type="submit"
              disabled={formState.isSubmitting || !formState.isValid}
            >
              {" "}
              {formState.isSubmitting ? "Loading" : "Submit"}{" "}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAddForm;
