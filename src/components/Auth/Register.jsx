import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoHeader from "../Header/TodoHeader";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkIfEmailExists = (email) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser && storedUser.email === email;
  };

  return (
    <div className="flex flex-col w-full h-screen bg-green-500">
      <TodoHeader text="Welcome to Todo, Let's Sign Up" />
      <div className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("Registering User:", values);

              const result = register(values.name, values.email, values.password);

              if (!result.success) {
                toast.error(result.message);
              } else {
                toast.success("Registration successful");
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              }

              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Form Fields */}
                <div className="mb-4">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
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
                <div className="mb-4">
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
                <div className="mb-4">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 text-white transition-colors duration-300 bg-green-500 rounded hover:bg-green-600"
                >
                  Register
                </button>
                <div className="mt-4 text-center">
                  <p className="text-gray-500">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="text-green-500 hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
