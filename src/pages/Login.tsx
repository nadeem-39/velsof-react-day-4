// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";
import { stateManagementZustandUI } from "@/lib/stateManagementZustandUI";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { Input } from "@base-ui/react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Enter minimum 8 digit password"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const lastVisitedPage = stateManagementZustandUI(
    (state) => state.lastVisitedPage,
  );
  const { register, handleSubmit, formState, getFieldState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit = (data: FormData) => {
    if (data.password === "password123") {
      login(
        {
          id: "1201",
          name: "Nadeem",
          email: data.email,
        },
        "jwt-token",
      );

      navigate(lastVisitedPage || "/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Card className="w-100 m-auto bg-gray-200 ring-0">
      <CardHeader>
        <CardContent className="font-bold">Book Form</CardContent>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldDescription>Fill all the required details</FieldDescription>
            <Field>
              <FieldLabel htmlFor="book-id">Email</FieldLabel>
              <Input
                id="email"
                {...register("email")}
                placeholder="Enter Email"
                className={"border rounded p-1"}
              ></Input>
              {(formState.errors.email || getFieldState("email").invalid) && (
                <FieldError className="text-red-500">
                  {formState.errors?.email?.message || "Enter Valid Email"}
                </FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                {...register("password")}
                placeholder="Enter Password "
                type="password"
                className={"border rounded p-1"}
              ></Input>
              {(formState.errors.password ||
                getFieldState("password").invalid) && (
                <FieldError className="text-red-500">
                  {formState.errors?.password?.message || "Enter Password"}
                </FieldError>
              )}
            </Field>
          </FieldGroup>

          <Button
            className="border-1-black mt-5 w-25 bg-blue-500 text-white"
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
          >
            {formState.isSubmitting ? "Loading" : "Submit"}{" "}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
