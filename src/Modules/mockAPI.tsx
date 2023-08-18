import { useEffect, useState } from "react";
import flight_data from "./FLIGHT_DATA.json";

interface FlightData {
  flight_number: number;
  airline: string;
  departure_airport: string;
  arrival_airport: string;
  departure_date: string;
  departure_time: string;
  arrival_time: string;
  duration: number;
  price: number;
  id: string;
}

interface FlightResponse {
  status: number;
  data: FlightData[];
  match: string;
}

export interface SearchParams {
  from: string;
  to: string;
  depart: string;
  return?: string;
}

function simulateFilter(options: SearchParams, data: FlightData[]) {
  let match = "No Flights Found";
  let filteredData = data.filter((flight) => {
    if (
      flight.departure_airport == options.from &&
      flight.arrival_airport == options.to &&
      flight.departure_date == options.depart
    )
      return true;
  });
  if (filteredData.length > 0) {
    match = "";
  } else {
    filteredData = data.filter((flight) => {
      if (
        flight.departure_airport == options.from &&
        flight.arrival_airport == options.to
      )
        return true;
    });
    if (filteredData.length > 0)
      match =
        "No flights found for the selected date, listing similar flights.";
  }
  return [filteredData, match];
}

function mockFetch(
  url: string,
  options: SearchParams
): Promise<FlightResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.flightsearch.com/flights") {
        const [parsedData, match] = simulateFilter(options, flight_data) as [
          FlightData[],
          string
        ];
        const response: FlightResponse = {
          status: 200,
          data: parsedData,
          match: match,
        };
        resolve(response);
      } else {
        reject(new Error("Not Found"));
      }
    }, 1000); // simulating delay
  });
}

export function useMockFetch(url: string, options: SearchParams) {
  const [flightData, setFlightData] = useState<FlightData[] | null>(null);
  const [match, setMatch] = useState<string>("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockFetch(url, options)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response;
      })
      .then((response) => {
        setMatch(response.match);
        return setFlightData(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [options, url]);

  return { flightData, error, loading, match };
}
