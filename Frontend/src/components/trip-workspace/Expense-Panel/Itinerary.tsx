import Markdown from "react-markdown"
import api from "../../../api/api"
import { useState } from "react"
import useAuth from "../../../context/authContext";

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

export default function Itinarary(props: { trip: Trip }) {

  const [itinerary, setItinerary] = useState(``);
  const [trip] = useState<Trip>(props.trip);
  const { loading } = useAuth();


  function handleItenaryCreation() {

    if (!loading && trip.destinationCity) {
      const city = trip.destinationCity;
      const country = trip.destinationCountry;
      const budget = trip.budgetLimit;
      const days = calculateDaysDifference(trip.startDate, trip.endDate);

      api.post(`services/generate-itinerary/${props.trip.id}`, { city, country, budget, days: days == 0 ? 5 : days })
        .then((response) => {
          setItinerary(response.data.data.scheduleText)

        }).catch((error: any) => {
          console.log(error);
          let text = error.response.data.error.errors[0].instance.scheduleText || "";
          setItinerary(text)
        })
    }
  }

  return (
    <div className=" border border-3 border-dark-subtle rounded-3">
      <div className=" bg-dark text-white p-2 rounded-top-2">
        <h3 className=" text-center"><span className="bi bi-stars text-warning"></span> AI Generated Schedule</h3>
      </div>
      <div className=" overflow-auto" style={{height:"76vh"}}>
        <div className="m-2 border border-3 border-dark-subtle rounded-3 p-2 mt-2 ">

          <div className=" d-flex justify-content-center align-items-center">

            <div className="h5 m-3" style={{ fontFamily: "Black Ops One" }}>Your Personelized Itinerary is Ready to be built.</div>
            <button className="mt-2 btn btn-dark p-2 px-3" onClick={handleItenaryCreation}><span className="text-warning bi bi-stars"></span> Generate Your Itinerary</button>

          </div>
        </div>
        <div className="m-2 border border-3 border-dark-subtle rounded-3 p-4 mt-2"  >
          <Markdown>
            {
              !itinerary ? "#### No Overview \n Please Click the button 'Generate Your Itinerary' above to Genereate Your Trip Iternarary " : itinerary
            }
          </Markdown>
        </div>
      </div>
    </div>
  )
}

function calculateDaysDifference(startDate: string | number, endDate: string | number): number {
  startDate = String(startDate);
  endDate = String(endDate);

  // Helper function to parse both date formats
  function parseDate(dateStr: string): Date {
    // Check if format is "2026 June 13" (Year Month Day with spaces, no dashes)
    if (dateStr.includes(' ') && !dateStr.includes('-')) {
      const months: Record<string, number> = {
        'january': 1, 'february': 2, 'march': 3, 'april': 4,
        'may': 5, 'june': 6, 'july': 7, 'august': 8,
        'september': 9, 'october': 10, 'november': 11, 'december': 12
      };

      const parts = dateStr.split(' ').map(p => p.trim());
      const year = parseInt(parts[0], 10);
      const monthName = parts[1].toLowerCase();
      const day = parseInt(parts[2], 10);

      const month = months[monthName];

      if (!month) {
        throw new Error(`Invalid month: ${monthName}`);
      }

      return new Date(year, month - 1, day);
    }

    // Otherwise assume "YYYY-MM-DD" format
    const [d1, m1, y1] = dateStr.split("-");
    return new Date(parseInt(y1, 10), parseInt(m1, 10) - 1, parseInt(d1, 10));
  }

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}