import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "context";
import Cocktail from "components/Cocktail";
import Loading from "components/Loading";

const CocktailList = () => {
  const { cocktails, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (cocktails.length < 1) {
    return (
      <h2 className="section-title">
        no cocktails matched your serach criteria
      </h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">Cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((drink) => {
          const { id } = drink;
          return (
            <Link key={id} to={`/cocktail/${id}`}>
              <Cocktail {...drink} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CocktailList;
