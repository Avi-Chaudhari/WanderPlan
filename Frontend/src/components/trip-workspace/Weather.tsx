import { useEffect, useState } from "react"
import api from "../../api/api";
import { toast } from "react-toastify";

interface WeatherX {
  date: string;
  maxTemp: number;
  minTemp: number;
  feelsLike: number;
  precipitation: number;
  weatherCode: number;
}

export default function Weather(props: { city: string, startDate: string | undefined, endDate: string | undefined }) {

  const getRainAdvice = (mm: number): string => {
    if (mm >= 0 && mm <= 3) {
      return "bi-sun-fill text-warning"; // ☀️ Bright Yellow Sun
    }
    if (mm > 3 && mm <= 5) {
      return "bi-cloud-drizzle-fill text-info"; // 🌦️ Light Blue Drizzle
    }
    if (mm > 5 && mm <= 10) {
      return "bi-cloud-rain-fill text-primary"; // 🌧️ Steady Darker Blue Rain
    }
    // Anything over 10mm
    return "bi-cloud-lightning-rain-fill text-danger"; // ⛈️ Red Storm Warning
  };

  const [weather, setWeather] = useState<WeatherX[]>();

  useEffect(() => {

    let sd;
    let ed;

   
      sd = props.startDate?.split("-").reverse().join("-") || "2026-06-06";
      ed = props.endDate?.split("-").reverse().join("-") || "2026-06-16";
    // }
    if(Number(sd.split("-")[1]) > new Date().getMonth()){
      sd = "2026-06-06";
      ed = "2026-06-16"
    }

    api.get(`services/weather?city=${props.city}&startDate=${sd}&endDate=${ed}`)
      .then((response) => {
        try {
          setWeather(response.data.forecast);

        } catch (error: any) {
          console.log(error);
          let msg = error.response.data.message || error.name || error.message
          toast.error(msg);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log( error.response.data.message);
        console.log(error.name);
        console.log(error.message);
      })
  }, [])

  return (
    <div className=" d-flex flex-row overflow-auto gap-3 p-3">
      {
        !weather ? <>No Weather Data Found</> :
          weather.map((w) =>
            <div key={w.date} className=" flex-shrink-0 border border-2 border-dark-subtle rounded-3 p-3 shadow bg-white" style={{width:"23%"}}>
              <div className=" d-flex justify-content-between">
                <div style={{ fontSize: "90%" }} className=" fw-bold">{w.date} &nbsp;</div>
                <span className={`fw-bold h4 `+getRainAdvice(w.precipitation)}></span>
              </div>
              <div style={{ fontSize: "80%" }} className=" fw-semibold">{w.minTemp}℃ / {w.maxTemp}℃</div>
              <div style={{ fontSize: "80%" }} className=" fw-semibold">Feels Like : {w.feelsLike}℃</div>
            </div>
          )
      }
    </div>
  )
}

// YOU NEED ANOTHER FUNCTON BECAUSE THE DATE COMMING FROM BACKEND IS => 15-06-2026
// AND YOU WANT => 2026-07-15 FOR PASSING IT TO THE API.


// function add5Days(dateString: string): string {
//   const [day, month, year] = dateString.split("-").reverse();
//   const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
//   date.setDate(date.getDate() + 5);

//   return date.toISOString().split("T")[0]; // "yyyy-mm-dd"
// }

// // // Usage
// // add5Days("12-06-2026"); // "2026-06-17"