import { add, format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

/*
Date picker component that allows the range from "today" up to a year later.
*/

function DatePicker() {
  const today = new Date();
  const [selected, setSelected] = useState<Date | undefined>(today);
  const [open, setOpen] = useState(false);

  const placeholder = selected ? format(selected, "P") : format(today, "P");

  return (
    <div>
      <p className="" onClick={() => setOpen(!open)}>{placeholder}</p>
      {open && <DayPicker
        mode="single"
        numberOfMonths={2}
        selected={selected}
        onSelect={setSelected}
        fromDate={today}
        toDate={add(today, { years: 1 })}
        className="relative -left-24 bg-slate-500 text-white p-6 rounded-xl"
      />}
    </div>
  );
}

export default DatePicker;
