import { useState } from "react";
import DatePicker from "./DatePicker";

function SearchBox() {
  const [oneWay, setOneWay] = useState(false);

  return (
    <>
      <div className="search-box-container flex gap-4 bg-sky-200 text-gray-600 p-6 pb-8 items-center">
        <div className="input-container flex-col flex relative">
          <label htmlFor="from" className="absolute  left-[.4rem]">
            From
          </label>
          <input
            type="text"
            className="pt-6 pb-4 px-2"
            placeholder="Country, city or airport"
            id="from"
          />
        </div>
        <div className="input-container flex-col flex relative">
          <label htmlFor="to" className="absolute  left-[.4rem]">
            To
          </label>
          <input
            type="text"
            className="pt-6 pb-4 px-2"
            placeholder="Country, city or airport"
            id="to"
          />
        </div>
        <div className="input-container flex w-24 items-center">
          <label htmlFor="one-way">One-way Flight</label>
          <input
            type="checkbox"
            id="one-way"
            className="relative peer shrink-0
            appearance-none w-6 h-6 border-2 border-blue-500 rounded-full bg-white
            mt-1 checked:bg-blue-800 checked:border-0"
            onChange={() => setOneWay(!oneWay)}
          />
        </div>
        <DatePicker label="Depart" oneWay={false} />
        <DatePicker label="Return" oneWay={oneWay} />
        <button type="button" className="rounded-md p-4">
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBox;
