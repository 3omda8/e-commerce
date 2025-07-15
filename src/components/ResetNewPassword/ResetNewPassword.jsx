import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function ResetNewPassword() {
  const email = localStorage.getItem("resetEmail");
  const navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      email,
      newPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
      newPassword(values);
    },
  });

  async function newPassword(values) {
    return await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then(() => {
        localStorage.removeItem("resetEmail");
        navigate("/login");
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
        <title>Reset Password</title>
      </Helmet>
      <div className="w-[70%] mx-auto my-4 lg:w-[60%] pt-10">
        <h2 className="text-3xl font-bold my-4">Enter New Password : </h2>

        <form onSubmit={formik.handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="input w-full my-2 focus:outline-0 rounded-lg border-1 border-gray-300"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="">{formik.errors.newPassword}</div>
          ) : null}

          <div className="flex justify-end items-center pt-5">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg flex justify-center items-center"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetNewPassword;
