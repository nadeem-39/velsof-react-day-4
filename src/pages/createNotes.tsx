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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";

const schema = z.object({
  title: z
    .string()
    .min(5, "Notes title can not be less than 5")
    .max(1000, "Notes title can not be geater than 1000"),
  content: z
    .string()
    .min(10, "Notes content must be at least 10 characters.")
    .max(10000, "Notes content name must be at most 10000 characters."),
  isPublic: z.boolean(),
});

type formSchema = z.infer<typeof schema>;

const NotesAddForm = () => {
  const {
    register,
    handleSubmit,
    formState,
    setError,
    getFieldState,
    reset,
    setValue,
  } = useForm<formSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<formSchema> = async (data) => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      console.log(data);

      addNotesMutation.mutate(data);
    } catch (error) {
      setError("root", { message: "Error in Book ID" });
    }
  };

  const queryClient = useQueryClient();

  const addNotesMutation = useMutation({
    mutationFn: (newBook: formSchema) =>
      instance.post(`/`, {
        content: newBook.content,
        title: newBook.title,
        isPublic: newBook.isPublic,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Notes added successfully");
      reset();
    },

    onError: () => {
      toast.error("Failed to add Notes");
    },
  });

  return (
    <div className="mt-10 flex justify-center text-center">
      <Card className="w-150 ring-0 bg-gray-200">
        <CardHeader>
          <CardContent className="font-bold">Notes Form</CardContent>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldDescription>Fill all the required details</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="isPublic">Visibility Type</FieldLabel>
                  <Select
                    onValueChange={(value) => {
                      setValue("isPublic", value === "public");
                      console.log(value == "public");
                    }}
                  >
                    <SelectTrigger className="w-full max-w-48 h-full ">
                      <SelectValue placeholder="Select Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className={"bg-gray-200"}>
                        <SelectItem value="public">public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="Enter Title"
                    type="text"
                  ></Input>
                  {(formState.errors.root?.message ||
                    getFieldState("title").invalid) && (
                    <FieldError className="text-red-500">
                      {formState.errors?.title?.message ||
                        "Title can not be less than 5 char"}
                    </FieldError>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="content">Content</FieldLabel>
                  <Input
                    id="content"
                    {...register("content")}
                    placeholder="Enter Content "
                    type="text"
                  ></Input>
                  {(formState.errors.root?.message ||
                    getFieldState("content").invalid) && (
                    <FieldError className="text-red-500">
                      {formState.errors?.content?.message ||
                        "Content can not be less than 10 char"}
                    </FieldError>
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

export default NotesAddForm;
