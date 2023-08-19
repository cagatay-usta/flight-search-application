import { useState } from "react";
import { useSearchContext } from "../Contexts/SearchContext";
interface AutoCompleteProps {
  id: string;
}

function AutoComplete({ id }: AutoCompleteProps) {
  const destinations = [
    "ATL (Atlanta)",
    "IST (Istanbul)",
    "LHR (London)",
    "JFK (New York)",
    "MEX (Mexico City)",
    "AYT (Antalya)",
    "SAW (Istanbul)",
  ];
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { handleDestination } = useSearchContext();

  function handleClick(item: string) {
    setValue(item);
    setSuggestions([]);
    setValidationError(null);
    handleDestination(item, id);
  }

  function handleValidation(value: string) {
    if (destinations.some((destination) => destination == value)) {
      setValidationError(null);
      handleDestination(value, id);
    } else {
      setValidationError("Please pick one of the available airports.");
    }
  }

  function autoComplete(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    const search = e.target.value.toLowerCase();
    const filtered = destinations.filter((city) => {
      return city.toLowerCase().includes(search);
    });
    setSuggestions(filtered);
  }
  return (
    <div className="relative flex-grow flex-shrink">
      <div className="input-container flex-col flex ">
        <label htmlFor={id} className="absolute left-[.4rem] capitalize">
          {id}
        </label>
        <input
          type="text"
          className={`pt-6 pb-4 px-2  ${
            id == "from" && "rounded-l-xl"
          } border-4 ${validationError ? "border-red-400" : "border-white"}`}
          placeholder="Country, city or airport"
          id={id}
          value={value}
          onBlur={() => handleValidation(value)}
          onChange={(e) => autoComplete(e)}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute bg-gray-200 flex flex-col gap-1 border-2 rounded-xl shadow-xl border-white  text-sky-900 top-[4.2rem] left-1 w-48 p-2 cursor-pointer z-10">
          {suggestions.map((item, index) => {
            return (
              <li key={index} onClick={() => handleClick(item)}>
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
