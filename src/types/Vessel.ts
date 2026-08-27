/**
 * Defines culture-vessel information used throughout Cellarium.
 *
 * Vessel data allows calculations to use properties such as
 * growth surface area and working volume rather than relying
 * only on vessel names.
 */


/* Broad category of culture vessel. */
export type VesselType =
  | "flask"
  | "plate"
  | "dish"
  | "other";


/* Defines one type of culture vessel. */
export type Vessel = {
  id: string;

  name: string;

  type: VesselType;

  /* Number of individual culture compartments. */
  wells: number;

  /* Growth surface area of ONE well/vessel in cm². */
  growthAreaCm2: number;

  /* Suggested working-volume range for ONE well/vessel. */
  workingVolumeMinMl?: number;
  workingVolumeMaxMl?: number;

  notes?: string;
};