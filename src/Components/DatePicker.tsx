import { add, format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useSearchContext } from "../Contexts/SearchContext";

/*
Date picker component that allows the range from "today" up to a year later for departure,
and automatically blocks return dates that are before departure date.
*/

interface DateProps {
  oneWay?: boolean;
  label: string;
}

function DatePicker({ oneWay = false, label }: DateProps) {
  const dateType = label.toLowerCase();
  const today = new Date();
  const { dates, handleDates, validationAlert } = useSearchContext();
  const [open, setOpen] = useState(false);

  let border = "border-white";
  if (validationAlert.departBigger) border = "border-red-400";
  if (oneWay) border = "border-slate-300"

  const handleDaySelect = (date: Date | undefined) => {
    handleDates(date, dateType);
    setOpen(false);
  };
  let placeholder = dates.depart && format(dates.depart, "P");
  if (dateType == "return")
    placeholder = dates.return ? format(dates.return, "P") : format(today, "P");

  const disabledStyle = oneWay
    ? `bg-slate-300 pt-6 pb-4 pr-12 px-2 text-slate-100 `
    : `bg-white pt-6 pb-4 pr-12 px-2`;

  return (
    <div className="input-container flex-col flex relative flex-grow flex-shrink min-w-[205px]">
      <p className={`absolute left-[.7rem] ${oneWay && "text-slate-100"} text-slate-400`}>
        {label}
      </p>
      <p
        className={`${disabledStyle} border-4 ${border}`}
        onClick={() => setOpen(!open)}
      >
        {placeholder}
      </p>
      {open && !oneWay && (
        <DayPicker
          mode="single"
          numberOfMonths={2}
          selected={dateType == "return" ? dates.return : dates.depart}
          onSelect={handleDaySelect}
          fromDate={dateType == "return" ? dates.depart : today}
          toDate={add(today, { years: 1 })}
          className="absolute -left-48 top-16 bg-slate-500 text-white p-6 rounded-xl z-10 shadow-xl "
        />
      )}
    </div>
  );
}

export default DatePicker;
