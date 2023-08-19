/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";

type SearchProviderProps = {
  children: ReactNode;
};

type Destination = {
  from: string;
  to: string;
};

type Dates = {
  depart: Date | undefined;
  return?: Date | undefined;
};

type SearchContext = {
  oneWay: boolean;
  setOneWay: React.Dispatch<React.SetStateAction<boolean>>;
  destination: Destination;
  dates: Dates;
  handleDestination: (destination: string, label: string) => void;
  handleDates: (date: Date | undefined, label: string) => void;
  displayFlights: boolean;
  handleFlightDisplay: () => void;
};

const SearchContext = createContext({} as SearchContext);

export function useSearchContext() {
  return useContext(SearchContext);
}

export function SearchContextProvider({ children }: SearchProviderProps) {
  const [destination, setDestination] = useState<Destination>({
    from: "",
    to: "",
  });

  function handleDestination(destination: string, label: string) {
    setDestination((prevState) => {
      return { ...prevState, [label]: destination };
    });
  }

  const [dates, setDates] = useState<Dates>({ depart: new Date() });
  const [oneWay, setOneWay] = useState(false);

  function handleDates(date: Date | undefined, label: string) {
    setDates((prevState) => {
      return { ...prevState, [label]: date };
    });
  }

  const [displayFlights, setDisplayFlights] = useState<boolean>(false);

  function handleFlightDisplay() {
    if (destination.from && destination.to) setDisplayFlights(true);
    console.log(destination.from);
    console.log(destination.to);
    console.log(displayFlights);
  }

  return (
    <SearchContext.Provider
      value={{
        oneWay,
        setOneWay,
        destination,
        handleDestination,
        dates,
        handleDates,
        displayFlights,
        handleFlightDisplay,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
