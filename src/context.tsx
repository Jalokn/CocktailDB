import React, { useState, useContext, useEffect, Dispatch } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

type GlobalContext = {
  loading: boolean;
  cocktails: {
    id: number;
    name: string;
    image: string;
    alcoholic: string;
    glass: string;
  }[];
  setSearchTerm: Dispatch<string>;
};

const AppContext = React.createContext({} as GlobalContext);

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState<[]>([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${searchTerm}`);
        const data = await response.json();
        const { drinks } = data;
        if (drinks) {
          const newCocktails = drinks.map(
            (drink: {
              idDrink: number;
              strDrink: string;
              strDrinkThumb: string;
              strAlcoholic: string;
              strGlass: string;
            }) => {
              const {
                idDrink,
                strDrink,
                strDrinkThumb,
                strAlcoholic,
                strGlass,
              } = drink;
              return {
                id: idDrink,
                name: strDrink,
                image: strDrinkThumb,
                alcoholic: strAlcoholic,
                glass: strGlass,
              };
            }
          );
          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
      setLoading(false);
    };
    fetchDrinks();
  }, [searchTerm]);

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
