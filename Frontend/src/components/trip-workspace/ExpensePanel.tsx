import { useParams } from "react-router-dom";
import Itinarary from "./Expense-Panel/Itinerary";
import SummeryDetails from "./Expense-Panel/SummaryDetails";
import HeaderBanner from "./HeaderBanner";
import Weather from "./Weather";
import { useEffect, useState } from "react";
import api from "../../api/api";
import useAuth from "../../context/authContext";
import Loader from "../Loader";

type UseParams = {
  tripId: string;
}


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



export default function ExpensePanel() {

  const { tripId } = useParams<UseParams>();
  const { loading } = useAuth()
  const [trip, setTrip] = useState<Trip>({
    id: "",
    userId: "",
    destinationCity: "",
    destinationCountry: "",
    startDate: "",
    endDate: "",
    budgetLimit: 0,
    countryFlag: "",
    currencyCode: ""
  });


  if (!tripId) {
    console.log(tripId);

    return <div> <code>404  No Trip Id {`'${tripId}'`} Found</code> </div>
  }


  useEffect(() => {
    api.get(`/trips/${tripId}`)
      .then((response) => {
        setTrip(response.data.data);
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      {
        loading ? <>Data Is Loading , Please Wait</> :
          <div className=" m-0 w-100 overflow-hidden" style={{height:"100vh"}}>
            <div><HeaderBanner tripId={tripId} /></div>
            <div className=" row overflow-auto" style={{ height: "85vh" }}>
              <div className=" col-8">
                <div>
                  {
                    !trip.startDate ? <Loader /> :
                    <Weather city="Mumbai" startDate={trip.startDate} endDate={trip.endDate} /> 
                  }
                </div>
                <div className=" overflow-auto" >
                  {
                    !trip.startDate ? <Loader /> :
                    <Itinarary trip={trip} />
                  }
                </div>
              </div>
              <div className=" col-4 overflow-auto" >
                <SummeryDetails tripId={tripId} />
              </div>
            </div>
          </div>
      }
    </div>
  )
}