import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import api from "../../../api/api";

export default function CreateExpense(props: { tripId: string ,onCreate : ()=>void}) {

  const formik = useFormik({
    initialValues: {
      "amount": 50.00,
      "category": "",
      "description": ""
    },
    onSubmit: (values) => {
      try {

        api.post(`trips/${props.tripId}/expenses`, { ...values })
          .then((response) => {
            if (response.data.success) {
              toast.success(response.data.message);
              props.onCreate();
            }
          }).catch((error: any) => {
            console.log(error);
            let msg = error.response.data.message || error.name || error.message || "Internal Server Error";
            toast.error(msg);
          })
      } catch (error: any) {
        console.log(error);
        let msg = error.response.data.message || error.name || error.message || "Internal Server Error"
        toast.error(msg);
      }
    },
    validationSchema: yup.object({
      "amount": yup.number().required().min(0),
      "category": yup.string().required(),
      "description": yup.string().required().min(5, "too short.")
    })
  })

  return (
    <div className=" container">
      <div className=" shadow bg-white p-3 border border-2 border-dark-subtle rounded-2">
        <form onSubmit={formik.handleSubmit} >
          <dl>
            <dt className=" d-flex justify-content-between"> <span>Amount</span> <span>Category</span></dt>
            <dd className=" input-group">
              <input type="number" className="mb-1 form-control" placeholder="50.00" name="amount" onChange={formik.handleChange} />
              <select name="category" className=" mb-1 form-select" onChange={formik.handleChange} >
                <option value="-1">Select Category</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="lodging">Lodging</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
              </select>
            </dd>
            <dd className=" text-danger">{formik.errors.amount}</dd>
            <dd className=" text-danger">{formik.errors.category}</dd>
            <dt>Quick Note</dt>
            <dd className=" d-flex justify-content-between">
              <div className=" w-75"><input className=" form-control" type="text" name="description" placeholder="Lunch at cafe Elspiro" onChange={formik.handleChange} /></div>
              <button type="submit" className=" btn btn-success px-4"><span className="bi bi-plus-circle"></span></button>
            </dd>
            <dd className=" text-danger">{formik.errors.description}</dd>
          </dl>
        </form>
      </div>
    </div>
  )
}