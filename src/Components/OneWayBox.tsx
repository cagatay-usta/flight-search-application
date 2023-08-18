import { useSearchContext } from "../Contexts/SearchContext";

function OneWayBox() {
  const { oneWay, setOneWay } = useSearchContext();
  return (
    <div className="input-container flex shrink-0 flex-grow w-32 h-16 items-center justify-around bg-white  p-[.5rem]">
      <label htmlFor="one-way">
        One-way Flight
      </label>
      <input
        type="checkbox"
        id="one-way"
        className="relative shrink-0
            appearance-none w-6 h-6 border-2 border-sky-500 rounded-full bg-white
            mt-1 checked:bg-sky-600 checked:border-0"
        onChange={() => setOneWay(!oneWay)}
      />
    </div>
  );
}

export default OneWayBox;
