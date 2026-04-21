import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm, Controller } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  studentId: z
    .number()
    .min(1, "Student Id can not be less than 1")
    .max(3210, "Student Id can not be geater than 3210"),
  studentTitle: z
    .string()
    .min(3, "Book Author name must be at least 3 characters.")
    .max(32, "Book Author name must be at most 32 characters."),
  studentAge: z
    .number()
    .min(12, "Age can not be less than 12")
    .max(100, "Book Id can not be geater than 1000"),
})

function DialogComponent(props: {
  id?: number | undefined
  title?: string | undefined
  age?: number | undefined
  open: boolean
  setOpen: any
}) {
  type formSchema = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: {},
    setError,
  } = useForm<formSchema>({
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
    <Dialog open={props.open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Student ID</Label>
              <Input
                id="name-1"
                {...register("studentId", { valueAsNumber: true })}
                defaultValue={props.id}
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Student Name</Label>
              <Input
                id="username-1"
                {...register("studentTitle")}
                defaultValue={props.title}
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Student Age</Label>
              <Input
                id="username-1"
                {...register("studentAge", { valueAsNumber: true })}
                defaultValue={props.age}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose>
              <Button
                variant="outline"
                onClick={() => {
                  props.setOpen(false)
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default DialogComponent
