import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import { useForm, Controller } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"

const schema = z.object({
  bookId: z
    .number()
    .min(1, "Book Id can not be less than 1")
    .max(3210, "Book Id can not be geater than 3210"),
  bookAuthor: z
    .string()
    .min(3, "Book Author name must be at least 3 characters.")
    .max(32, "Book Author name must be at most 32 characters."),
  bookTitle: z
    .string()
    .min(8, "Book Title must be at least 8 characters")
    .max(32, "Book Title must be at most 32 characters"),
})

type formSchema = z.infer<typeof schema>

const BookAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    reset,
  } = useForm<formSchema>({
    // defaultValues: {
    //   bookId: 0,
    //   bookAuthor: "",
    //   bookTitle: "",
    // },
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<formSchema> = async (data) => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
      console.log(data)
    } catch (error) {
      setError("root", { message: "Error in Book ID" })
    }
  }

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
                    {...register("bookId", { valueAsNumber: true })}
                    placeholder="Enter Book id"
                    type="number"
                  ></Input>
                  {errors.bookId?.message && (
                    <FieldError className="text-red-500">
                      {errors.bookId.message}
                    </FieldError>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="book-title">Book Title</FieldLabel>
                  <Input
                    id="book-title"
                    {...register("bookTitle")}
                    placeholder="Enter Title "
                    type="text"
                  ></Input>
                  {errors.bookTitle?.message && (
                    <FieldError className="text-red-500">
                      {errors.bookTitle.message}
                    </FieldError>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="book-author">Author Name</FieldLabel>
                  <Input
                    id="book-author"
                    {...register("bookAuthor")}
                    placeholder="Enter book author's name"
                    title="text"
                  ></Input>
                  {errors.bookAuthor?.message && (
                    <FieldError className="text-red-500">
                      {errors.bookAuthor.message}
                    </FieldError>
                  )}
                  {errors.root?.message && (
                    <FieldError>Please enter book author's name</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldGroup>
            <Button
              className="border-1-black mt-5 mr-10 w-25 bg-blue-500 text-white"
              onClick={() => {
                reset()
              }}
            >
              Reset
            </Button>
            <Button
              className="border-1-black mt-5 w-25 bg-blue-500 text-white"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {" "}
              {isSubmitting ? "Loading" : "Submit"}{" "}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookAddForm
