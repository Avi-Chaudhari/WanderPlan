import { FastifyReply, FastifyRequest } from 'fastify';
import { getWeatherData } from '../services/weather.services';

interface WeatherQuery {
  city: string;
  startDate: string;
  endDate: string;
}

export const getWeatherHandler = async (
  request: FastifyRequest<{ Querystring: WeatherQuery }>,
  reply: FastifyReply
) => {
  try {
    const { city, startDate, endDate } = request.query;

    console.log("Incming Information",city,startDate,endDate);
    
    if (!city || !startDate || !endDate) {
      return reply.status(400).send({ 
        success: false, 
        error: 'Missing query parameters: city, startDate, and endDate are required.' 
      });
    }

    const forecast = await getWeatherData(city, startDate, endDate);

    return reply.status(200).send({
      success: true,
      city,
      forecast
    });
  } catch (error: any) {
    return reply.status(500).send({ success: false, error: error.message });
  }
};