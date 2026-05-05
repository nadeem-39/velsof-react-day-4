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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-8">
          <div className="card overflow-hidden">
            <div className="bg-soft-primary">
              <div className="row">
                <div className="col-12">
                  <div className="text-primary p-4">
                    <h5 className="text-primary">Book Form</h5>
                    <p>Add a new book</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pt-0">
              <div className="p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="book-id">Book Id*</label>

                    <input
                      id="book-id"
                      {...register("id", {
                        valueAsNumber: true,
                      })}
                      placeholder="Enter Book id"
                      type="number"
                      className="form-control"
                    ></input>
                    {(formState.errors.id || getFieldState("id").invalid) && (
                      <p className="text-red-500">
                        {formState.errors?.id?.message ||
                          "Id can not be less than 1"}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="book-title">Title*</label>

                    <input
                      id="book-title"
                      {...register("title")}
                      placeholder="Enter Title "
                      type="text"
                      className="form-control"
                    ></input>
                    {(formState.errors.title ||
                      getFieldState("title").invalid) && (
                      <p className="text-red-500">
                        {formState.errors?.title?.message ||
                          "Book name can not be less than 8 char"}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="book-author">Author Name*</label>

                    <input
                      id="book-author"
                      {...register("author")}
                      placeholder="Enter book author's name"
                      className="form-control"
                      type="text"
                    ></input>
                    {(formState.errors.author ||
                      getFieldState("author").invalid) && (
                      <p className="text-red-500">
                        {formState.errors?.author?.message ||
                          "Author name can not be less than 3 char"}
                      </p>
                    )}
                    {formState.errors.root?.message && (
                      <p>{formState.errors?.author?.message}</p>
                    )}
                  </div>

                  <button
                    className="btn btn-primary btn-block waves-effect waves-light"
                    onClick={() => {
                      reset();
                    }}
                  >
                    Reset
                  </button>

                  <button
                    className="btn btn-primary btn-block waves-effect waves-light"
                    type="submit"
                    disabled={formState.isSubmitting || !formState.isValid}
                  >
                    {" "}
                    {formState.isSubmitting ? "Loading" : "Submit"}{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAddForm;
