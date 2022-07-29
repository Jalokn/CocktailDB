import React from "react";
import CocktailList from "components/CocktailList";
import Searchform from "components/SearchForm";

const Home = () => {
  return (
    <main>
      <Searchform />
      <CocktailList />
    </main>
  );
};

export default Home;
