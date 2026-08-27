/**
 * Default media library for Cellarium.
 *
 * These recipes act as starter options for the interface.
 * Users will eventually be able to create and save their own
 * laboratory-specific media recipes.
 */

import type { MediaRecipe } from "../types/Media";

export const mediaRecipes: MediaRecipe[] = [
  {
    id: "complete-dmem",
    name: "Complete DMEM",
    basalMedium: "DMEM",

    components: [
      {
        id: "fbs",
        name: "FBS",
        workingConcentration: 10,
        workingUnit: "%",
      },

      {
        id: "pen-strep",
        name: "Penicillin/Streptomycin",
        workingConcentration: 1,
        workingUnit: "X",
      },
    ],

    notes: "Example complete DMEM formulation.",
  },

  {
    id: "complete-rpmi",
    name: "Complete RPMI",
    basalMedium: "RPMI 1640",

    components: [
      {
        id: "fbs",
        name: "FBS",
        workingConcentration: 10,
        workingUnit: "%",
      },

      {
        id: "pen-strep",
        name: "Penicillin/Streptomycin",
        workingConcentration: 1,
        workingUnit: "X",
      },
    ],

    notes: "Example complete RPMI formulation.",
  },
];