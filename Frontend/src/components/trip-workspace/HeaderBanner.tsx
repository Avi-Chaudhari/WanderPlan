import { useEffect, useState } from "react"
import api from "../../api/api"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface Trip {
  id: string;
  userId: string;
  destinationCity: string;
  destinationCountry: string;
  startDate: string;
  endDate: string;
  budgetLimit: number;
  countryFlag: string;
  currencyCode: string;
}

export default function HeaderBanner(props: { tripId: string }) {

  const [trip, setTrip] = useState<Trip>();

  function fetchTrip() {
    api.get(`/trips/${props.tripId}`)
      .then((response) => {
        setTrip(response.data.data)
      })
      .catch((error: any) => {
        console.log(error);
        let msg = error.response.data.message || error.message || error.name || "Internal Server Error";
        toast.error(msg)
      })
  }

  useEffect(() => {
    fetchTrip();
  }, [])

  return (
    <div className=" d-flex justify-content-between align-items-center w-100 p-2 bg-dark-subtle rounded-3">
      <div>
        <div className=" d-flex">
          <h2 className=" fw-bolder">{trip?.destinationCountry + ","}</h2>
          <h2 className=" fw-bolder">&nbsp;{trip?.destinationCity}</h2>
          <h2 className=" fw-bolder">&nbsp;{trip?.countryFlag}</h2>
        </div>
        <div className=" d-flex flex-wrap gap-3">
          <h6><span className=" bi bi-calendar-check-fill"></span> : {trip?.startDate} - {trip?.endDate}</h6>
          <h6> <span className="bi bi-coin"></span> :  {trip?.currencyCode}</h6>
        </div>
      </div>
      <div className="">
          <Link to="/dash" className=" btn btn-success p-2"><span className="bi bi-arrow-left"> </span> Back to Dashboard</Link>
      </div>
    </div>
  )
}