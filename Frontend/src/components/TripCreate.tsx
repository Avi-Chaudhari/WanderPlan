import { useFormik } from "formik"
import * as yup from 'yup'
import api from "../api/api"
import { toast } from "react-toastify"

type TripsType = {
  id:string ;
  destinationCountry: string;
  destinationCity: string;
  startDate: string;
  endDate: string;
  budgetLimit: number;
  countryFlag: string;
  countryCurrency: string;
}
export default function TripCreate(props:{onTripCreate:(trip:TripsType)=> void}) {

  const formik = useFormik({
    initialValues: {
      "destinationCity": "",
      "destinationCountry": "",
      "startDate": "",
      "endDate": "",
      "budgetLimit": 0
    },
    onSubmit: (values) => {
      console.log(values);

      api.post("/trips/new", { ...values })
        .then((response) => {
          if (response.data.success) {
            props.onTripCreate(response.data.data)
            toast.success(response.data.message);
          }
        })
        .catch((error: any) => {
          console.log(error)
        })

    },
    validationSchema: yup.object({
      "destinationCity": yup.string().required(),
      "destinationCountry": yup.string().required(),
      "startDate": yup.string().required(),
      "endDate": yup.string().required(),
      "budgetLimit": yup.number().required().min(1, "Budget Badhao Yarr Free mein Kon hi Trip pe Jata Hai")
    })
  })

  return (
    <div className=" container ">
      <div className=" d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <form className=" shadow border border-1 border-secondary rounded-5 px-5 py-4" onSubmit={formik.handleSubmit}>
          <h3 className=" fw-bold text-center mb-3 pb-2 border-bottom border-2 " style={{ fontFamily: "Black Ops One" }}>Create New Trip</h3>
          <dl className="">
            <div className="">
              <dt>Destination City</dt>
              <dd>
                <input placeholder="City" type="text" name="destinationCity" className=" form-control" onChange={formik.handleChange} />
              </dd>
              <dd className=" text-danger">{formik.errors.destinationCity}</dd>
            </div>
            <div className="mt-3">
              <dt>Destination Country</dt>
              <dd>
                <input placeholder="Country" type="text" name="destinationCountry" className=" form-control" onChange={formik.handleChange} />
              </dd>
              <dd className=" text-danger">{formik.errors.destinationCountry}</dd>
            </div>
            <div className="mt-3">
              <dt>Start Date</dt>
              <dd>
                <input type="date" name="startDate" className=" form-control" onChange={formik.handleChange} />
              </dd>
              <dd className=" text-danger">{formik.errors.startDate}</dd>
            </div>
            <div className="mt-3">
              <dt>End Date</dt>
              <dd>
                <input type="date" name="endDate" className=" form-control" onChange={formik.handleChange} />
              </dd>
              <dd className=" text-danger">{formik.errors.endDate}</dd>
            </div>
            <div className="mt-3">
              <dt>Budget Limit</dt>
              <dd>
                <input placeholder="0000" type="number" name="budgetLimit" className=" form-control" onChange={formik.handleChange} />
              </dd>
              <dd className=" text-danger">{formik.errors.budgetLimit}</dd>
            </div>
          </dl>
          <button type="submit" className=" btn btn-success w-100 p-2">Submit</button>
        </form>
      </div>
    </div>
  )
}