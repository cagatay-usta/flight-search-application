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
  const [dates, setDates] = useState<Dates>({ depart: new Date() });
  const [oneWay, setOneWay] = useState(false);

  function handleDestination(destination: string, label: string) {
      setDestination((prevState) => {
        return {...prevState, [label]:destination}   
      })
  }

  function handleDates(date: Date | undefined, label: string) {
    setDates((prevState) => {
      return {...prevState, [label]:date}
    })
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
