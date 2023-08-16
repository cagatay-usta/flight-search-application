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

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PPP")}.</p>;
  }
  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
        fromDate={today}
        toDate={add(today, { years: 1 })}
      />
    </div>
  );
}

export default DatePicker;
