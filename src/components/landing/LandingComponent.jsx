"use client";

import { useEffect, useState } from "react";
import { getRecipesAPI, getRecipesDetailsAPI } from "../../functions/API";
import ModalComponent from "../templates/ModalComponent";
import { XMarkIcon } from "@heroicons/react/24/outline";

const LandingComponent = () => {
  const [isRecipeListFetching, setIsRecipeListFetching] = useState(true);
  const [recipeLists, setRecipeLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeListDetails, setRecipeListDetails] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  // using useEffect to fetch recipes api's
  useEffect(() => {
    const fetchRecipes = async () => {
      if (isRecipeListFetching) {
        try {
          const response = await getRecipesAPI();
          if (response.statusCode === 200) {
            setRecipeLists(response.recipe);
            setIsRecipeListFetching(false);
          } else {
            console.log(response.message);
          }
        } catch (error) {
          console.error(error);
          setIsRecipeListFetching(false);
        }
      }
    };

    fetchRecipes();
  }, [isRecipeListFetching]);

  // handler for showing viewing details
  const handleViewInstruction = (id) => {
    setSelectedRecipeId(id);
    setIsModalOpen(true);
  };

  // Fetch recipe details only when the modal is opened
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (isModalOpen && selectedRecipeId) {
        try {
          const details = await getRecipesDetailsAPI(selectedRecipeId);
          if (details.statusCode === 200) {
            setRecipeListDetails(details.recipe);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchRecipeDetails();
  }, [isModalOpen, selectedRecipeId]);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/ecommerce-images/home-page-01-hero-full-width.jpg"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />
      </div>

      <main>
        {/* Category section */}
        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
        >
          {" "}
          <h1 className="text-3xl md:text-5xl font-bold text-center font-serif">
            List of Recipes
          </h1>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {recipeLists.map((recipes, index) => (
                <div
                  key={recipes.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                    <img
                      alt={recipes.title}
                      src={recipes.imageURL}
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900">
                      <a href={recipes.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {recipes.title}
                      </a>
                    </h3>
                    <ul className="list-disc pl-4 text-gray-600 pb-5">
                      {" "}
                      {/* Added list and padding */}
                      {recipes.ingredients.slice(0, 3).map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))}
                      {recipes.ingredients.length > 3 && (
                        <li className="text-gray-500">.....</li>
                      )}
                    </ul>

                    <button
                      onClick={() => handleViewInstruction(recipes.id)}
                      className="relative z-10 w-full py-2 bg-[#1acd81] rounded-lg text-white cursor-pointer hover:bg-[#43e5a0]  font-bold shadow-lg"
                    >
                      View Instructions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ModalComponent
        isOpen={isModalOpen}
        onCloseHandler={() => setIsModalOpen(false)}
        header={
          <div className=" md:py-4 md:px-4 pt-3 pb-3 px-4 text-center">
            <span className="text-[#215b3d] inline md:text-lg text-xs">
              Recipe Details
            </span>
          </div>
        }
        body={
          <>
            {" "}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            {recipeListDetails && (
              <>
                <h2 className="text-2xl font-bold text-gray-900  text-center pb-5 md:pb-2">
                  {recipeListDetails.title}
                </h2>

                <div className="md:flex justify-between items-center px-5 gap-7 pb-5">
                  <div className="md:w-1/2 lg:w-3/5">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        alt={recipeListDetails.title}
                        src={recipeListDetails.imageURL}
                        className="object-cover object-center w-full"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-8 lg:col-span-6">
                    <h1 className="font-bold py-2">Ingredients</h1>
                    <div className="mb-5">
                      <ul className=" text-sm text-gray-700 list-disc pl-5 w-full">
                        {recipeListDetails.ingredients.map((ins, index) => (
                          <li key={index}>{ins}</li> // Using index as the key
                        ))}
                      </ul>
                    </div>
                    <div className="mb-5">
                      <h1 className="py-2 font-bold">Instructions</h1>
                      <ul className="text-sm text-gray-700 list-disc pl-5 w-full">
                        {recipeListDetails.instructions.map((ins, index) => (
                          <li key={index}>{ins}</li> // Using index as the key
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        }
      />
    </div>
  );
};

export default LandingComponent;
