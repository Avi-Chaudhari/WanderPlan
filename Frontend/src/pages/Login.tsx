import WPlogo from "../assets/WanderPlanLogo.png"
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import useAuth from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const navigate = useNavigate();
  const {login} = useAuth();
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit:(values)=>{
      try {
          axios.post("http://localhost:9900/auth/login",{...values})
          .then((response)=>{
            login(response.data.data.token);
            toast.success("Logged in.")
            navigate("/dash");
            
          }).catch(
            (er:any)=>{
              console.log(er);
              toast.error(er.response?.data?.message || "Login failed.");
            }
          )

          
      } catch (error:any) {
        console.log(error.response?.data);
        toast.error(error.response?.data?.message)        
      }
    },
    validationSchema : yup.object({
      "email":yup.string().required().email(),
      "password": yup.string().required(),
    })
  })

  return (
    <div className=" container-fluid">
      <div className=" d-flex justify-content-center align-items-center" style={{ height: "99vh" }}>
        <form className=" p-4 rounded-4 border-2 border shadow border-dark-subtle" style={{ width: "350px" }} onSubmit={formik.handleSubmit}>
          <div className=" d-flex justify-content-center">
            <img src={WPlogo} width={"280vw"} height={"150vw"} alt="Wander Plan" />
          </div>
          <hr />
          <dl>
            <div className=" mb-3">
              <dt className=" form-label">Email</dt>
              <dd><input name="email" type="text" className=" form-control" placeholder="example@email.com" onChange={formik.handleChange} /></dd>
              <dd className=" text-danger" >{formik.errors.email}</dd>
            </div>
            <div className=" mb-3">
              <dt className=" form-label">Password</dt>
              <dd><input name="password" type="password" className=" form-control" onChange={formik.handleChange} /></dd>
              <dd className=" text-danger" >{formik.errors.password}</dd>
            </div>
            <button type="submit" className="btn btn-success w-100 p-2">Sign in</button>
          </dl>
          <p className=" mb-0 text-center" style={{ fontSize: "70%" }}>new to wander plan? <Link to="/register"> register here </Link> </p>
        </form>
      </div>
    </div>
  )
}
