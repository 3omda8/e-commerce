import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TokenContext } from "../../context/TokenContext";
import Cookies from "js-cookie";

function Login() {
  let [isLoading, setIsLoading] = useState(false);
  let [userError, setUserError] = useState("");
  let navigate = useNavigate();
  let { setToken, expiryDate } = useContext(TokenContext);

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d).+$/,
          "Password must be at least contain a capital letter and a number"
        )
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      loginForm(values);
    },
  });

  async function loginForm(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        setIsLoading(false);
        setUserError(null);
        Cookies.set("userToken", data.data.token, { expires: expiryDate });
        setToken(data.data.token);
        window.location.reload();
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setUserError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
  return (
    <>
      <div className="w-[70%] mx-auto my-4 lg:w-[60%]">
        <h2 className="text-3xl font-bold my-4">Login </h2>
        {userError ? (
          <div className="alert alert-error">
            <div className="flex-1">
              <label className="text-lg">{userError}</label>
            </div>
          </div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            className="input w-full my-2 focus:outline-0 rounded-lg border-1 border-gray-300"
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
            className="input w-full my-2 focus:outline-0 rounded-lg border-1 border-gray-300"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg flex justify-center items-center"
            >
              {isLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-white text-xl mr-2"
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
