import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodoHeader from "../Header/TodoHeader";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUpRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col w-full h-screen bg-green-500 ">
      <TodoHeader text="Welcome to Todo,  Let's Sign In" />
      <div className="flex items-center justify-center flex-1 md:-mt-20 ">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Login Attempt:", values);
              const success = login(values.email, values.password);
              if (success) {
                toast.success("Login successful!");
                navigate("/todos");
              } else {
                toast.error("Invalid email or password");
              }
              console.log(
                "User stored in localStorage:",
                localStorage.getItem("user")
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div className="mb-6">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 text-white transition-colors duration-300 bg-green-500 rounded hover:bg-green-600"
                >
                  LOGIN
                </button>
                <p className="mt-4 text-center text-gray-500">
                  Not registered?{" "}
                  <button
                    type="button"
                    onClick={handleSignUpRedirect}
                    className="text-green-500 hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
