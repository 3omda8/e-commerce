import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

function ForgetPassword() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (value) => {
      resetPass(value);
    },
  });

  async function resetPass(value) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        value
      )
      .then(() => {
        console.log("Email submitted:", value.email);
        localStorage.setItem("resetEmail", value.email);
        navigate("/verfiyCode");
      })
      .catch((err) => {
        console.error("Error sending email:", err.response?.data?.message);
        alert(err.response?.data?.message || "Failed to send code.");
      });
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
      </Helmet>
      <div className="w-[70%] mx-auto my-4 lg:w-[60%] pt-10">
        <h2 className="text-3xl font-bold my-4">Forget Password : </h2>

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

          <div className="flex justify-end items-center pt-5">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg flex justify-center items-center"
            >
              Send Code
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
