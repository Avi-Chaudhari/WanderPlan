import useAuth from "../context/authContext";
import Loader from "./Loader";
import { Link } from "react-router-dom";

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

function TripsInfo(props:{trips:TripsType[]}) {

  const { loading } = useAuth();
  return (
    <div className=" container-fluid p-2 d-flex jusify-content-center align-items-center">
      <div className=" d-flex gap-5">
      {
        loading ? <Loader /> :
          !props.trips ? <><>No Data</></> : props.trips?.length <=0 ? <>No Data</> :
            props.trips.map((trip) =>
              <div key={trip.id} className=" mt-1 card border border-3 border-success p-3 bg-primary-subtle" style={{ width: "320px" }}>
                <div className=" card-header">
                  <div className=" text-center fw-bold form-control"><span className=" bi-geo-alt-fill"></span> {trip.destinationCity} , {trip.destinationCountry} {trip.countryFlag}</div>
                </div>
                <div className=" card-body  border border-dark rounded-2 border-2 text-center mb-2 mt-2">
                  <dl>
                    <dt className="btn w-100 fw-bold">Date <span className="bi bi-calendar-date"></span> </dt>
                    <dd className="fw-semibold w-100 btn btn-light"><div>{trip.startDate} - {trip.endDate}</div></dd>
                    <dt className="btn fw-bold w-100">Budget <span className="bi bi-currency-exchange"></span></dt>
                    <dd className="fw-semibold btn w-100 btn-light"><div >{trip.budgetLimit} {trip.countryCurrency}</div></dd>
                  </dl>
                </div>
                <div className=" card-footer">
                  <Link className=" btn btn-success w-100" to={`/trip/${trip.id}`}>View Workspace</Link>
                </div>
              </div>
            )
      }
      </div>



    </div>
  )
}

export default TripsInfo;