import { format } from "date-fns";
import { FlightData } from "./mockAPI";

export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatTime = (totalMin: number, type = "short") => {
  const hours = Math.floor(totalMin / 60) % 24;
  let minutes = `${totalMin % 60}`;
  if (minutes.length < 2) minutes = `0${minutes}`;
  if (type == "long") {
    return `${hours}h ${minutes}`;
  }
  return `${hours}:${minutes}`;
};

export const dateToString = (date: Date) => {
  return format(date, "dd.MM.yyyy");
};

export const addDuration = (departure: string, duration: number) => {
  const [hours, mins] = departure.split(":");
  const totalMins = Number(hours) * 60 + Number(mins) + duration;
  return formatTime(totalMins);
};

// month is 0-indexed
export const stringToDate = (string: string) => {
  const formattedstring = string.split(".");
  return new Date(
    new Date(
      Number(formattedstring[2]),
      Number(formattedstring[1]) - 1,
      Number(formattedstring[0])
    )
  );
};

export function sortFlightData(data: FlightData[] | null, option: string) {
  const copyData = data && [...data];
  switch (option) {
    case "price":
      copyData?.sort((a, b) => a.price - b.price);
      break;
    case "date":
      copyData?.sort(
        (a, b) =>
          stringToDate(a.departure_date).getTime() -
          stringToDate(b.departure_date).getTime()
      );
      break;
    case "duration":
      copyData?.sort((a, b) => a.duration - b.duration);
      break;
    case "time":
      copyData?.sort((a, b) => {
        const [aHours, aMins] = a.departure_time.split(":");
        const [bHours, bMins] = b.departure_time.split(":");
        const aTotalMins = Number(aHours) * 60 + Number(aMins);
        const bTotalMins = Number(bHours) * 60 + Number(bMins);
        return aTotalMins - bTotalMins;
      });
      break;
  }
  return copyData;
}
