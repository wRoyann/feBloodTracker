import { useQuery } from "@tanstack/react-query";
import { showLocation } from "../api/auth";

export const useLocationDonor = () => {
  return useQuery({
    queryKey: ["location-donor"],
    queryFn: showLocation,
  });
};
