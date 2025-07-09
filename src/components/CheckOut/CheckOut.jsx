import { useFormik } from "formik";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import * as Yup from "yup";

function CheckOut() {
  const { onlinePayment, cashPayment } = useContext(CartContext);
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "",
    },
    validationSchema: Yup.object({
      details: Yup.string()
        .details("Invalid Details")
        .required("details is required"),
      city: Yup.string().city("Invalid Details").required("city is required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Phone must be Egyption number")
        .required("Phone Number is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      applyPayment(values);
    },
  });

  async function applyPayment(values) {
    if (values.paymentMethod === "online") {
      await onlinePayment(values);
    } else if (values.paymentMethod === "cash") {
      await cashPayment(values);
    } else {
      console.log("Error in Payment Method");
    }
  }
  return (
    <div className="w-full md:w-1/2 mx-auto p-4 pt-16">
      <h1 className="py-6 font-bold text-main-color text-xl">
        Enter Your Shipping data:
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Details.."
          className="input w-full my-2 focus:outline-0 rounded-lg"
          name="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.details && formik.errors.details ? (
          <div className="">{formik.errors.details}</div>
        ) : null}
        <input
          type="tel"
          placeholder="Phone.."
          className="input w-full my-2 focus:outline-0 rounded-lg"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="">{formik.errors.phone}</div>
        ) : null}
        <input
          type="text"
          placeholder="City.."
          className="input w-full my-2 focus:outline-0 rounded-lg"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.city && formik.errors.city ? (
          <div className="">{formik.errors.city}</div>
        ) : null}
        <div className="text-end pt-4">
          <select
            name="paymentMethod"
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="select select-success"
          >
            <option disabled={true}>Choose A Payment Method</option>
            <option value="online">Online Payment</option>
            <option value="cash">Cash Payment</option>
          </select>
        </div>

        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="px-8 py-2 bg-green-500 text-white rounded-lg flex justify-center items-center mt-5"
          >
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckOut;
