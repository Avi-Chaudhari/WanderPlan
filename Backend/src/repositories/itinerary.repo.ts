import { ENV } from "../config/env.config";
import Itinerary from "../models/itinerary.model";
import Groq from 'groq-sdk';


const groq = new Groq({
  apiKey: ENV.ai_key, // Add your Groq API key here
});

async function createItinerary(tripId: string, city: string ,country: string, budget:number ,days: number) {

  const scheduleText = await generateScheduleText(city,country, budget,days);

  return Itinerary.create({
    scheduleText,
    tripId
  });

}

async function generateScheduleText(city: string, country: string, budget: number, days: number) {
  try {
    const prompt = `You are an expert travel guide. Create a detailed, highly structured day-by-day itinerary for a ${days}-day trip to ${city}, ${country} with the budget of ${budget} of local currency. Include specific morning, afternoon, and evening activities along with local food recommendations. Keep it engaging and format the response cleanly in Markdown.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // or "llama3-8b-8192", "mistral-saba-24b", etc.
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4096,
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content returned from Groq');
    }

    return content;

  } catch (error) {
    console.log(error);
    throw new Error("AI Itinerary generation failed.");
  }
}

export default createItinerary ;