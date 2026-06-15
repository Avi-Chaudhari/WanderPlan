import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TripsInfo from "../components/TripsInfo";
import api from "../api/api";
import { toast } from "react-toastify";
import TripCreate from "../components/TripCreate";

interface User { 
  name: string; 
  email: string;
  city: string;
  country: string;
}

interface TripsType {
  id:string ;
  destinationCountry: string;
  destinationCity: string;
  startDate: string;
  endDate: string;
  budgetLimit: number;
  countryFlag: string;
  countryCurrency: string;
}

export default function Dashboard() {

  const [show, setShow] = useState(false);
  const [user, setUser] = useState<User>();
  const [trips,setTrips] = useState<TripsType[]>([]);

  function addTrip(trip:TripsType){
    setTrips((prev)=>[...prev , trip]);
  }

  function fetchTrips(){
    api.get("/trips/list")
    .then((response)=>{
      if(response.data.success){
        setTrips(response.data.data);
      }
    })
    .catch((error:any)=>{
      console.log(error);
      if(error.response.data.message){
        toast.error(error.response.data.message);
      }
    })
  }

  // Close on ESC key
  useEffect(() => {
    
    api.get("/users/profile")
      .then((response) => {
        setUser(response.data.data)
      })
      .catch((error: any) => {
        const er = error.response.data.message || error.message || error.name || "Internal Server Error";
        toast.error(er);
        console.log(error);
      })
      fetchTrips();

    const handleEsc = (e: any) => {
      if (e.key === 'Escape') setShow(false);
    };
    if (show) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [show]);

  return (
    <div className=" " style={{height:"100vh"}}>
      <NavBar userName={user?.name || "Boss"} />
      <div className=" m-1">
        <div className=" d-flex p-3 justify-content-between bg-dark-subtle rounded-4">
          <div style={{ fontFamily: "Black Ops One" }}><h2>Welcome back, {user?.name || "Boss"}</h2></div>
          <div>
            <button type="button" className=" btn btn-success px-3" onClick={() => setShow(true)}> <span className=" bi bi-plus-circle"> Plan A Trip</span></button>

            {show && (
              <div
                className="modal fade show"
                style={{ display: 'block' }}
                onClick={() => setShow(false)}
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShow(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      
                     <TripCreate onTripCreate={addTrip} />
                    </div>
                    
                  </div>
                </div>
              </div>
            )} 
          </div>
        </div>
        <div className=" rounded-4 bg-dark-subtle mt-2 p-2 overflow-auto" style={{ height: "73vh" }}>
          <TripsInfo trips = {trips}/>

        </div>
      </div>
    </div>
  )
}