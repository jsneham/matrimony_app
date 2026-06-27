/**
 * Height Conversion Utility Functions (TypeScript)
 */

/**
 * Interface for feet and inches representation
 */
interface HeightFeetInches {
  feet: number;
  inches: number;
}

/**
 * Interface for complete height information
 */
interface HeightInfo {
  feet: number;
  inches: number;
  cm: number;
  formatted: string;
  totalInches: number;
}

/**
 * Convert feet and inches to centimeters
 * @overload
 * @param feet - Number of feet
 * @param inches - Number of inches
 * @returns Height in centimeters
 */
export function feetInchesToCm(feet: number, inches: number): number;

/**
 * @overload
 * Convert height string to centimeters
 * @param heightString - Height string (e.g., "4ft 1in", "4'1\"")
 * @returns Height in centimeters or null if invalid format
 */
export function feetInchesToCm(heightString: string): number | null;

/**
 * Convert feet and inches to centimeters
 * Supports both number parameters and string parsing
 * @throws Error if inputs are invalid
 */
export function feetInchesToCm(
  feetOrString: number | string,
  inches?: number,
): number | null {
  // String overload: parse and convert
  if (typeof feetOrString === "string") {
    const match: RegExpMatchArray | null = feetOrString
      .trim()
      .match(/(\d+)\s*(?:ft|')\s*(\d+)\s*(?:in|")?/i);

    if (!match) {
      return null;
    }

    const feet: number = parseInt(match[1], 10);
    const parsedInches: number = parseInt(match[2], 10);

    return feetInchesToCm(feet, parsedInches);
  }

  // Number overload: direct conversion
  if (typeof feetOrString !== "number" || typeof inches !== "number") {
    throw new Error("Feet and inches must be numbers");
  }

  const totalInches: number = feetOrString * 12 + inches;
  const centimeters: number = totalInches * 2.54;

  return Math.round(centimeters * 100) / 100;
}

/**
 * Convert centimeters to feet and inches
 * @param cm - Height in centimeters
 * @returns Object with feet and inches properties
 * @throws Error if input is not a number
 */
export function cmToFeetInches(cm: number): HeightFeetInches {
  if (typeof cm !== "number") {
    throw new Error("Centimeters must be a number");
  }

  const totalInches: number = cm / 2.54;
  const feet: number = Math.floor(totalInches / 12);
  const inches: number = Math.round((totalInches % 12) * 100) / 100;

  return { feet, inches };
}

/**
 * Parse height string and convert to centimeters
 * Supports formats: "4ft 1in", "4'1\"", "4ft1in", "4 ft 1 in"
 * @param heightString - Height string to parse
 * @returns Height in centimeters or null if invalid format
 * @throws Error if input is not a string
 */
export function parseHeightToCm(heightString: string): number | null {
  if (typeof heightString !== "string") {
    throw new Error("Height must be a string");
  }

  const match: RegExpMatchArray | null = heightString
    .trim()
    .match(/(\d+)\s*(?:ft|')\s*(\d+)\s*(?:in|")?/i);

  if (!match) {
    return null;
  }

  const feet: number = parseInt(match[1], 10);
  const inches: number = parseInt(match[2], 10);

  return feetInchesToCm(feet, inches);
}

/**
 * Format height as readable string (e.g., "4'1\"")
 * @param feet - Number of feet
 * @param inches - Number of inches
 * @returns Formatted height string
 * @throws Error if inputs are not numbers
 */
export function formatHeight(feet: number, inches: number): string {
  if (typeof feet !== "number" || typeof inches !== "number") {
    throw new Error("Feet and inches must be numbers");
  }

  return `${feet}'${inches}"`;
}

/**
 * Get height in multiple formats
 * @param feet - Number of feet
 * @param inches - Number of inches
 * @returns Object containing all height representations
 */
export function getHeightInfo(feet: number, inches: number): HeightInfo {
  const cm: number = feetInchesToCm(feet, inches);
  const formatted: string = formatHeight(feet, inches);
  const totalInches: number = feet * 12 + inches;

  return {
    feet,
    inches,
    cm,
    formatted,
    totalInches,
  };
}

/**
 * Validate height values
 * @param feet - Number of feet
 * @param inches - Number of inches (should be 0-11)
 * @returns Boolean indicating if height is valid
 */
export function isValidHeight(feet: number, inches: number): boolean {
  return (
    typeof feet === "number" &&
    typeof inches === "number" &&
    feet >= 0 &&
    inches >= 0 &&
    inches < 12 &&
    Number.isInteger(feet) &&
    Number.isInteger(inches)
  );
}

export function getHeightInCm(heightStr: string | undefined): number {
  const cm = feetInchesToCm(heightStr ?? "0");
  return Math.round(cm ?? 0);
}
