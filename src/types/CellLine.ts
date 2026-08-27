/**
 * Defines the structure of a cell-line record in Cellarium.
 *
 * This type describes the biological and culture information
 * needed by the Cell Library, passage workflows, media tools,
 * and planner.
 */

import type { MediaComponent } from "./Media";

export type CultureBehaviour =
  | "adherent"
  | "suspension"
  | "semi-adherent";

export type PassageStrategy =
  | "split-ratio"
  | "cells-per-vessel"
  | "cells-per-cm2"
  | "cells-per-ml";



export type CellLine = {
  id: string;

  name: string;
  species: string;
  tissue: string;

  cultureBehaviour: CultureBehaviour;

  basalMedium: string;
  supplements: MediaComponent[];

  passageStrategy: PassageStrategy;

  typicalSplitRatio?: {
    numerator: number;
    denominator: number;
  };

  targetCellsPerVessel?: number;
  targetCellsPerCm2?: number;
  targetCellsPerMl?: number;

  doublingTimeHours?: number;

  passageConfluencyMin?: number;
  passageConfluencyMax?: number;

  preferredVessels: string[];

  coating?: string;

  notes?: string;
};