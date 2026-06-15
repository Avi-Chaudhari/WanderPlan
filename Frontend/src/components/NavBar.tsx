import WPlogo from "../assets/WanderPlanLogo.png"
import useAuth from "../context/authContext";
import { toast } from "react-toastify";
function NavBar(props :{userName :string}) {
  
  const {logout} =   useAuth();
  
  return (
    <nav className=" bg-dark rounded-2 row w-100 m-0">

      <div className=" col-6"> <img src={WPlogo} height={"50vh"} width={"100vh"} /></div>
      <div className=" col-6 d-flex justify-content-between ">
         <div className=" text-white m-3 h4">
            <span className="bi bi-person fw-bolder "></span> {props.userName+"'s Dashboard"}
         </div>

        <button className=" btn btn-outline-light w-25 p-1 my-3 "onClick={()=>{
          toast.info("Logged out.");
          logout();
        }} > Logout</button>
      </div>
    </nav>
  )
}

export default NavBar;