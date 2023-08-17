import { add, format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

/*
Date picker component that allows the range from "today" up to a year later.
*/

interface DateProps {
  oneWay: boolean;
  label: string;
}

function DatePicker({ oneWay, label }: DateProps) {
  const today = new Date();
  const [selected, setSelected] = useState<Date | undefined>(today);
  const [open, setOpen] = useState(false);

  const handleDaySelect = (date: Date | undefined) => {
    setSelected(date);
    setOpen(false);
  };

  const placeholder = selected ? format(selected, "P") : format(today, "P");
  const disabledStyle = oneWay
    ? `bg-slate-300 pt-6 pb-4 pr-12 px-2 text-slate-100`
    : `bg-white pt-6 pb-4 pr-12 px-2`;

  return (
    <div className="input-container flex-col flex relative">
      <p className={`absolute  left-[.4rem] ${oneWay && "text-slate-100"}`}>
        {label}
      </p>
      <p className={disabledStyle} onClick={() => setOpen(!open)}>
        {placeholder}
      </p>
      {open && !oneWay && (
        <DayPicker
          mode="single"
          numberOfMonths={2}
          selected={selected}
          onSelect={handleDaySelect}
          fromDate={today}
          toDate={add(today, { years: 1 })}
          className="absolute -left-48 top-16 bg-slate-500 text-white p-6 rounded-xl"
        />
      )}
    </div>
  );
}

export default DatePicker;
