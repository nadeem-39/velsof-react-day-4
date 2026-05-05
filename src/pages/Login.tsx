// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";
import { stateManagementZustandUI } from "@/lib/stateManagementZustandUI";

// import { button } from "@/components/ui/button";

// import { input } from "@base-ui/react";

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

  // return (

  //   <Card classNameNameName="w-100 m-auto bg-gray-100 ring-0">
  //     <CardHeader>
  //       <CardContent classNameNameName="font-bold">Book Form</CardContent>
  //     </CardHeader>
  //     <CardContent>
  //       <form onSubmit={handleSubmit(onSubmit)}>
  //         <FieldGroup>
  //           <FieldDescription>Fill all the required details</FieldDescription>
  //           <Field>
  //             <label htmlFor="book-id">Email</label>
  //             <input
  //               id="email"
  //               {...register("email")}
  //               placeholder="Enter Email"
  //               classNameNameName={"border rounded p-1"}
  //             ></input>
  //             {(formState.errors.email || getFieldState("email").invalid) && (
  //               <p classNameNameName="text-red-500">
  //                 {formState.errors?.email?.message || "Enter Valid Email"}
  //               </p>
  //             )}
  //           </Field>
  //           <Field>
  //             <label htmlFor="password">Password</label>
  //             <input
  //               id="password"
  //               {...register("password")}
  //               placeholder="Enter Password "
  //               type="password"
  //               classNameNameName={"border rounded p-1"}
  //             ></input>
  //             {(formState.errors.password ||
  //               getFieldState("password").invalid) && (
  //               <p classNameNameName="text-red-500">
  //                 {formState.errors?.password?.message || "Enter Password"}
  //               </p>
  //             )}
  //           </Field>
  //         </FieldGroup>

  //         <button
  //           classNameNameName="border-1-black mt-5 w-25 bg-blue-500 text-white"
  //           type="submit"
  //           disabled={formState.isSubmitting || !formState.isValid}
  //         >
  //           {formState.isSubmitting ? "Loading" : "Submit"}{" "}
  //         </button>
  //       </form>
  //     </CardContent>
  //   </Card>
  // );
  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">
                        Welcome to Library Management System
                      </h5>
                      <p>Sign in to continue</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-2">
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group">
                      <label htmlFor="username">Email</label>

                      <input
                        id="email"
                        {...register("email")}
                        placeholder="Enter Email"
                        className="form-control"
                      ></input>
                      {(formState.errors.email ||
                        getFieldState("email").invalid) && (
                        <p className="text-red-500">
                          {formState.errors?.email?.message ||
                            "Enter Valid Email"}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="userpassword">Password</label>
                      <input
                        id="password"
                        {...register("password")}
                        placeholder="Enter Password "
                        type="password"
                        className="form-control"
                      ></input>
                      {(formState.errors.password ||
                        getFieldState("password").invalid) && (
                        <p className="text-red-500">
                          {formState.errors?.password?.message ||
                            "Enter Password"}
                        </p>
                      )}
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlInline"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlInline"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="mt-3">
                      <button
                        className="btn btn-primary btn-block waves-effect waves-light"
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <h5 className="font-size-14 mb-3">Sign in with</h5>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a
                            href="javascript::void()"
                            className="social-list-item bg-primary text-white border-primary"
                          >
                            <i className="mdi mdi-facebook"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            href="javascript::void()"
                            className="social-list-item bg-info text-white border-info"
                          >
                            <i className="mdi mdi-twitter"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            href="javascript::void()"
                            className="social-list-item bg-danger text-white border-danger"
                          >
                            <i className="mdi mdi-google"></i>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4 text-center">
                      <a href="#" className="text-muted">
                        <i className="mdi mdi-lock mr-1"></i> Forgot your
                        password?
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <div>
                <p>
                  &copy; Copyright <i className="mdi mdi-heart text-danger"></i>{" "}
                  RFP System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
