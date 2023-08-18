import { useSearchContext } from "../Contexts/SearchContext";

function OneWayBox() {
  const { oneWay, setOneWay } = useSearchContext();
  return (
    <div className="input-container flex shrink-0 w-32 items-center bg-white  p-[.5rem]">
      <label htmlFor="one-way" className="relative -top-[8px]">
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
