"use server";
import { createAI, createStreamableValue } from "ai/rsc";

import { recipeAgent } from "@/app/receipe-agent";
import { ReactNode } from "react";
import { PartialLasagna } from "./types";

export async function generateRecipe() {
  const recipeStream = createStreamableValue<PartialLasagna>();

  recipeAgent()
    .then(async (partialObjectStream) => {
      for await (const partialObject of partialObjectStream.partialObjectStream) {
        if (partialObject.recipe) {
          recipeStream.update(partialObject);
        }
      }
    })
    .finally(() => {
      recipeStream.done();
    });

  return recipeStream.value;
}

export type UIState = Array<{
  display: ReactNode;
}>;

export const AI = createAI({
  initialUIState: [] as UIState,
  actions: {
    generateRecipe,
  },
});
