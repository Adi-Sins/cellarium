/**
 * Defines media and supplement structures used throughout Cellarium.
 *
 * These types allow media recipes to be built from a basal medium
 * plus one or more supplements such as FBS, antibiotics, or growth factors.
 */


/* Units that may be used for stock or working concentrations. */
export type ConcentrationUnit =
  | "%"
  | "X"
  | "mM"
  | "µM"
  | "nM"
  | "mg/mL"
  | "µg/mL"
  | "ng/mL";


/* One component added to a basal medium. */
export type MediaComponent = {
  id: string;

  name: string;

  /* Optional stock concentration, if relevant. */
  stockConcentration?: number;
  stockUnit?: ConcentrationUnit;

  /* Desired concentration in the finished medium. */
  workingConcentration: number;
  workingUnit: ConcentrationUnit;

  notes?: string;
};


/* Complete medium recipe. */
export type MediaRecipe = {
  id: string;

  name: string;

  basalMedium: string;

  components: MediaComponent[];

  notes?: string;
};