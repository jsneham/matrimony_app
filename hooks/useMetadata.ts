// hooks/useMetadata.ts
import { metadataService } from "@/services/metadataService";
import { AppMetadata } from "@/types/metadata";
import { useQuery } from "@tanstack/react-query";

export const METADATA_QUERY_KEY = ["app-metadata"];

/**
 * Base query hook to fetch and manage all app metadata.
 * staleTime is set to Infinity to ensure the lists are fetched exactly once per session.
 */
export const useMetadata = () => {
  return useQuery<AppMetadata, Error>({
    queryKey: METADATA_QUERY_KEY,
    queryFn: metadataService.getAppMetadata,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
    refetchOnWindowFocus: false, // Do not refetch on window focus
    refetchOnReconnect: false, // Do not refetch on internet reconnect
  });
};

/**
 * Hook to retrieve the list of religions.
 */
export const useReligions = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.religions || [],
  };
};

/**
 * Hook to retrieve the list of castes, optionally filtered by a parent religionId.
 */
export const useCastes = (religionId?: string) => {
  const query = useMetadata();
  const castes = query.data?.castes || [];

  const filteredCastes = religionId
    ? castes.filter((caste) => caste.religionId === religionId)
    : castes;

  return {
    ...query,
    data: filteredCastes,
  };
};

/**
 * Hook to retrieve the list of countries.
 */
export const useCountries = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.countries || [],
  };
};

/**
 * Hook to retrieve the list of states, optionally filtered by a parent countryId.
 */
export const useStates = (countryId?: string) => {
  const query = useMetadata();
  const states = query.data?.states || [];

  const filteredStates = countryId
    ? states.filter((state) => state.countryId === countryId)
    : states;

  return {
    ...query,
    data: filteredStates,
  };
};

/**
 * Hook to retrieve the list of cities, optionally filtered by a parent stateId.
 */
export const useCities = (stateId?: string) => {
  const query = useMetadata();
  const cities = query.data?.cities || [];

  const filteredCities = stateId
    ? cities.filter((city) => city.stateId === stateId)
    : cities;

  return {
    ...query,
    data: filteredCities,
  };
};

/**
 * Hook to retrieve the list of educations.
 */
export const useEducations = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.educations || [],
  };
};

/**
 * Hook to retrieve the list of occupations.
 */
export const useOccupations = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.occupations || [],
  };
};

/**
 * Hook to retrieve the list of languages/mother tongues.
 */
export const useLanguages = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.mothertongue || [],
  };
};

/**
 * Hook to retrieve the list of gotras.
 */
export const useGotras = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.gotras || [],
  };
};

/**
 * Hook to retrieve the list of manglik statuses.
 */
export const useMangliks = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.mangliks || [],
  };
};

/**
 * Hook to retrieve the list of marital statuses.
 */
export const useMaritalStatuses = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.maritalStatuses || [],
  };
};

/**
 * Hook to retrieve the list of income.
 */
export const useIncome = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.income || [],
  };
};

/**
 * Hook to retrieve the list of age.
 */
export const useAge = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.ageRang || [],
  };
};

/**
 * Hook to retrieve the list of height.
 */
export const useHeight = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.heights || [],
  };
};

export const useProfileBy = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.profileBy || [],
  };
};

export const useReferences = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.reference || [],
  };
};
export const useBodyType = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.bodyType || [],
  };
};

export const useEating = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.diet || [],
  };
};

export const useSmoking = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.smoke || [],
  };
};

export const useDrinking = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.drink || [],
  };
};

export const useSkinTone = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.complexion || [],
  };
};

export const useBloodGroup = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.bloodGroup || [],
  };
};

export const useHealth = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.physicalInfo || [],
  };
};
export const useWeight = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.weight || [],
  };
};
export const useHoroscope = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.horoscope || [],
  };
};

export const useMoonSign = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.moonsign || [],
  };
};

export const useWorkSector = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.employeeIn || [],
  };
};

export const useDesignation = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.designations || [],
  };
};

export const useFamilyType = () => {
  const query = useMetadata();
  console.log("query===", query.data?.familyType);

  return {
    ...query,
    data: query.data?.familyType || [],
  };
};

export const useFamilyStatus = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.familyStatus || [],
  };
};

export const useNoOfBrothers = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.noOfBrothers || [],
  };
};

export const useNoOfMarriedBrothers = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.noMarriBrother || [],
  };
};

export const useNoOfSisters = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.noOfSisters || [],
  };
};

export const useNoOfMarriedSisters = () => {
  const query = useMetadata();
  return {
    ...query,
    data: query.data?.noMarriSister || [],
  };
};
