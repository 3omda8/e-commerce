import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

function Register() {
  let [isLoading, setIsLoading] = useState(false);
  let [userMessage, setUserMessage] = useState("");
  let [userError, setUserError] = useState("");

  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must not exceed 50 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d).+$/,
          "Password must be at least contain a capital letter and a number"
        )
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Re-Password is required"),
      phone: Yup.string()
        .matches(
          /^(010|011|012|015)\d{8}$/,
          "Phone number must be Egyption Number"
        )
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      registerForm(values);
    },
  });

  async function registerForm(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        setUserMessage(data.data.message);
        setUserError(null);
        setIsLoading(false);
        navigate("/login");
        console.log(data.data.message);
      })
      .catch((err) => {
        setUserError(err.response.data.message);
        setUserMessage(null);
        setIsLoading(false);
        console.log(err.response.data.message);
      });
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="w-[70%] mx-auto my-4 lg:w-[60%]">
        <h2 className="text-3xl font-bold my-4">Register Now:</h2>
        {userMessage ? (
          <div className="alert alert-success">
            <div className="flex-1">
              <label className="text-lg">{userMessage}</label>
            </div>
          </div>
        ) : null}
        {userError ? (
          <div className="alert alert-error">
            <div className="flex-1">
              <label className="text-lg">{userError}</label>
            </div>
          </div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="input w-full my-2 focus:outline-0 rounded-lg"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}

          <input
            type="email"
            placeholder="E-mail"
            className="input w-full my-2 focus:outline-0 rounded-lg"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="">{formik.errors.email}</div>
          ) : null}
          <input
            type="password"
            placeholder="Password"
            className="input w-full my-2 focus:outline-0 rounded-lg"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <input
            type="password"
            placeholder="Re-Password"
            className="input w-full my-2 focus:outline-0 rounded-lg"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div>{formik.errors.rePassword}</div>
          ) : null}
          <input
            type="tel"
            placeholder="Phone Number"
            className="input w-full my-2 focus:outline-0 rounded-lg"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div>{formik.errors.phone}</div>
          ) : null}

          <div className="text-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg"
            >
              {isLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-white text-xl mr-2"
                />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
