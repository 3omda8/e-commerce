import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function VerifyCode() {
  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (value) => {
      console.log(value);
      verify(value);
    },
  });

  async function verify(value) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        value
      )
      .then(() => {
        navigate("/resetPassword");
      })
      .catch((err) => {
        console.error("Error sending Code:", err.response?.data?.message);
        alert(err.response?.data?.message || "Failed to send code.");
      });
  }
  return (
    <>
      <div className="w-[70%] mx-auto my-4 lg:w-[60%] pt-10">
        <h2 className="text-3xl font-bold my-4">Verification Code : </h2>

        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Code.."
            className="input w-full my-2 focus:outline-0 rounded-lg border-1 border-gray-300"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resetCode && formik.errors.resetCode ? (
            <div className="">{formik.errors.resetCode}</div>
          ) : null}

          <div className="flex justify-end items-center pt-5">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg flex justify-center items-center"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default VerifyCode;
