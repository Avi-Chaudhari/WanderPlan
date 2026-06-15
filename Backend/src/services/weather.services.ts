import axios from 'axios';
import convertDateFormat from '../utils/handleDateformat';

interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  feelsLike: number;
  precipitation: number;
  weatherCode: number;
}

export const getWeatherData = async (
  city: string,
  startDate: string,
  endDate: string
): Promise<DailyForecast[]> => {
  try {

    startDate = convertDate(startDate);
    endDate = convertDate(endDate);
     console.log("Outgoing Information",city,startDate,endDate);

    // --- STEP 1: Convert City Name to Coordinates (Geocoding) ---
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geocodeResponse = await axios.get(geocodeUrl);

    if (!geocodeResponse.data.results || geocodeResponse.data.results.length === 0) {
      throw new Error(`Location '${city}' not found.`);
    }

    const { latitude, longitude } = geocodeResponse.data.results[0];

    // --- STEP 2: Fetch Daily Historical/Forecast Metrics for Trip Dates ---
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,weather_code&timezone=auto`;
    const weatherResponse = await axios.get(weatherUrl);
    
    const daily = weatherResponse.data.daily;

    // --- STEP 3: Map the arrays into clean objects for our Frontend ---
    const formattedForecast: DailyForecast[] = daily.time.map((date: string, index: number) => ({
      date : convertDateFormat(date),
      maxTemp: daily.temperature_2m_max[index],
      minTemp: daily.temperature_2m_min[index],
      feelsLike: daily.apparent_temperature_max[index],
      precipitation: daily.precipitation_sum[index],
      weatherCode: daily.weather_code[index],
    }));

    return formattedForecast;

  } catch (error: any) {
    console.error('Weather Service Error:', error.message);
    throw new Error('Failed to retrieve weather data.');
  }
};

function convertDate(dateStr: string): string {
  // Month name to number mapping
  const months: Record<string, number> = {
    'january': 1, 'february': 2, 'march': 3, 'april': 4,
    'may': 5, 'june': 6, 'july': 7, 'august': 8,
    'september': 9, 'october': 10, 'november': 11, 'december': 12
  };

  // Split "2026 June 13" into parts
  const parts = dateStr.split(' ').map(p => p.trim());
  const year = parts[0];
  const monthName = parts[1].toLowerCase();
  const day = parts[2];

  const month = months[monthName];

  if (!month) {
    throw new Error(`Invalid month: ${monthName}`);
  }

  // Format as YYYY-MM-DD
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');

  return `${year}-${formattedMonth}-${formattedDay}`;
}

// Usage
const input = "2026 June 13";
const output = convertDate(input);
console.log(output); // "2026-06-13"