import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

interface ICocktail {
  name: string;
  image: string;
  alcoholic: string;
  category: string;
  glass: string;
  instructions: string;
  ingredients: string[];
}

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState<ICocktail | null>(null);

  useEffect(() => {
    setLoading(true);
    const getCocktail = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: alcoholic,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strMeasure1,
            strMeasure2,
            strMeasure3,
            strMeasure4,
            strMeasure5,
            strMeasure6,
            strMeasure7,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strMeasure1,
            strIngredient2,
            strMeasure2,
            strIngredient3,
            strMeasure3,
            strIngredient4,
            strMeasure4,
            strIngredient5,
            strMeasure5,
            strIngredient6,
            strMeasure6,
            strIngredient7,
            strMeasure7,
          ];
          const newCocktail = {
            name,
            image,
            alcoholic,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCocktail();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">That cocktail does not exist</h2>;
  }
  const { name, image, category, alcoholic, glass, instructions, ingredients } =
    cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data"> Name:</span> {name}
          </p>
          <p>
            <span className="drink-data"> Category:</span> {category}
          </p>
          <p>
            <span className="drink-data"> info:</span> {alcoholic}
          </p>
          <p>
            <span className="drink-data"> glass:</span> {glass}
          </p>
          <p>
            <span className="drink-data"> instructions:</span> {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients:</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
