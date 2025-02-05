// src/components/FeaturedRecipesSlider.jsx
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecipeCard from "./RecipeCard";
import { useState, useEffect } from "react";
// import recipesData from "../data/recipesData";

const FeaturedRecipesSlider = () => {
  const [recipesData, setRecipes] = useState([]);

  useEffect(() => {
    // Define the backend API endpoint
    const recipeApi =
      "https://flavor-factory-m190.onrender.com/api/v1/recipe/allrecipes";

    // Fetch data from the backend when the component mounts
    axios
      .get(recipeApi)
      .then((response) => {
        // Update the state with the fetched data
        console.log("recipes", response.data);
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // console.log(recipesData);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {recipesData.slice(0, 10).map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedRecipesSlider;
