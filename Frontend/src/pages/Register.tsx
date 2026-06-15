import { useFormik } from "formik"
import WPlogo from "../assets/WanderPlanLogo.png"
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      city: "",
      country: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:9900/auth/register", { ...values });
        if (response.data.success) {
          const data = response.data
          if (data.success) {
            console.log(data);
            toast.success(data.message);
            setTimeout(()=>{
              navigate('/login')
            },5000)
          }
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    validationSchema: yup.object({
      "name": yup.string().required().max(20),
      "email": yup.string().email().required(),
      "password": yup.string().required(),
      "city": yup.string().required(),
      "country": yup.string().required()
    })
  })

  return (
    <div className="  container m-1 " >
      {/* <button onClick={()=>{console.log(window.localStorage.getItem('token'))}}>get token</button> */}
      <div className=" row ms-1" style={{ width: "98vw" }}>
        <div className="col-md-5 bg-dark rounded-start-4" style={{ fontFamily: "Black Ops One" }}>
          <div className=" d-flex justify-content-center align-items-center text-white" style={{ height: "97vh" }}>
            <div>
              <div className="d-flex justify-content-center mb-5">
                <img src={WPlogo} alt="WanderPlan" width={"400vw"} height={"200vw"} />
              </div>
              <div className="d-flex justify-content-center mb-5">
                <div className=" text-center">
                  <h2>Plan With AI. </h2>
                  <h2>Track With Precision.</h2>
                  <h2>Start Your Trip Now.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 rounded-end-4 border border-3 border-dark overflow-auto">
          <div className=" bg-white d-flex justify-content-center align-items-center" style={{ height: "97vh", fontSize: "90%" }}>
            <div>
              <form className=" shadow p-4 rounded-3 border-2 border shadow border-dark-subtle" onSubmit={formik.handleSubmit}>
                <h5 className="mt-0 text-center border-bottom pb-2 fw-bold">New User</h5>
                <dl>
                  <div className=" mt-0 mb-2">
                    <dt className=" form-label">Name</dt>
                    <dd><input type="text" className=" form-control" placeholder="Name" name="name" onChange={formik.handleChange} /></dd>
                    <dd className=" text-danger" >{formik.errors.name}</dd>
                  </div>
                  <div className=" mb-2">
                    <dt className=" form-label">Email</dt>
                    <dd><input type="text" className=" form-control" placeholder="example@email.com" name="email" onChange={formik.handleChange} /></dd>
                    <dd className=" text-danger" >{formik.errors.email}</dd>
                  </div>
                  <div className=" mb-2">
                    <dt className=" form-label">Password</dt>
                    <dd><input type="password" className=" form-control" name="password" onChange={formik.handleChange} /></dd>
                    <dd className=" text-danger" >{formik.errors.password}</dd>
                  </div>
                  <div className=" mb-2">
                    <dt className=" form-label">City</dt>
                    <dd><input type="text" className=" form-control" placeholder="eg. Mumbai" name="city" onChange={formik.handleChange} /></dd>
                    <dd className=" text-danger" >{formik.errors.city}</dd>
                  </div>
                  <div className=" mb-2">
                    <dt className=" form-label">Country</dt>
                    <dd><input type="text" className=" form-control" placeholder="eg. India" name="country" onChange={formik.handleChange} /></dd>
                    <dd className=" text-danger" >{formik.errors.country}</dd>
                  </div>
                  <button className="btn btn-success w-100 mt-2" type="submit">
                    Register
                  </button>
                </dl>
                <p style={{ fontSize: "90%" }} className="mb-0">already have an account? <Link to="/login">login here</Link> </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}