/**
 * Default culture-vessel library for Cellarium.
 *
 * These values provide commonly used vessel options for the UI.
 * Individual laboratories or users will eventually be able to
 * override or add their own vessel definitions.
 */

import type { Vessel } from "../types/Vessel";

export const vessels: Vessel[] = [
  {
    id: "t25",
    name: "T25 Flask",
    type: "flask",
    wells: 1,
    growthAreaCm2: 25,
    workingVolumeMinMl: 4,
    workingVolumeMaxMl: 7,
  },

  {
    id: "t75",
    name: "T75 Flask",
    type: "flask",
    wells: 1,
    growthAreaCm2: 75,
    workingVolumeMinMl: 10,
    workingVolumeMaxMl: 15,
  },

  {
    id: "t175",
    name: "T175 Flask",
    type: "flask",
    wells: 1,
    growthAreaCm2: 175,
    workingVolumeMinMl: 20,
    workingVolumeMaxMl: 30,
  },

  {
    id: "6-well",
    name: "6-well Plate",
    type: "plate",
    wells: 6,
    growthAreaCm2: 9.6,
    workingVolumeMinMl: 2,
    workingVolumeMaxMl: 3,
  },

  {
    id: "12-well",
    name: "12-well Plate",
    type: "plate",
    wells: 12,
    growthAreaCm2: 3.8,
    workingVolumeMinMl: 1,
    workingVolumeMaxMl: 2,
  },

  {
    id: "24-well",
    name: "24-well Plate",
    type: "plate",
    wells: 24,
    growthAreaCm2: 1.9,
    workingVolumeMinMl: 0.5,
    workingVolumeMaxMl: 1,
  },

  {
    id: "96-well",
    name: "96-well Plate",
    type: "plate",
    wells: 96,
    growthAreaCm2: 0.32,
    workingVolumeMinMl: 0.1,
    workingVolumeMaxMl: 0.2,
  },
];