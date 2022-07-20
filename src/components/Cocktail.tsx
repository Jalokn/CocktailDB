import React from "react";

const Cocktail = ({
  image,
  name,
  id,
  alcoholic,
  glass,
}: {
  image: string;
  name: string;
  id: number;
  alcoholic: string;
  glass: string;
}) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{alcoholic}</p>
      </div>
    </article>
  );
};

export default Cocktail;
