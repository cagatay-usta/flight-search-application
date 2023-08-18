import {useSearchContext} from "../Contexts/SearchContext";
import DatePicker from "./DatePicker";

function SearchBox() {
  const {oneWay, setOneWay} = useSearchContext();

  return (
    <>
      <div className="search-box-container flex justify-center gap-1 bg-sky-900 text-gray-600 p-16 items-center">
        <div className="input-container flex-col flex relative ">
          <label htmlFor="from" className="absolute  left-[.4rem]">
            From
          </label>
          <input
            type="text"
            className="pt-6 pb-4 px-2 rounded-l-xl"
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
        <div className="input-container flex w-32 items-center bg-white  p-[.5rem]">
          <label htmlFor="one-way" className="relative -top-[8px]">One-way Flight</label>
          <input
            type="checkbox"
            id="one-way"
            className="relative peer shrink-0
            appearance-none w-6 h-6 border-2 border-sky-500 rounded-full bg-white
            mt-1 checked:bg-sky-600 checked:border-0"
            onChange={() => setOneWay(!oneWay)}
          />
        </div>
        <DatePicker label="Depart" oneWay={false} />
        <DatePicker label="Return" oneWay={oneWay} />
        <button
          type="button"
          className="rounded-r-lg p-[1.275rem] px-7 bg-sky-600 text-white font-bold"
        >
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBox;
