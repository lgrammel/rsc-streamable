"use client";
import { generateRecipe } from "@/app/action";
import { useState } from "react";
import DisplayRecipe from "./display-recipe";

export default function Recipe() {
  const [recipe, setRecipe] = useState<{
    display: JSX.Element;
  } | null>(null);

  async function handleGenerateRecipe() {
    setRecipe({
      display: <DisplayRecipe recipe={await generateRecipe()} />,
    });
  }

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleGenerateRecipe}>Generate recipe</button>

      {recipe && <div>{recipe?.display}</div>}
    </div>
  );
}
