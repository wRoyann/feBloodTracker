import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLocation, showLocation } from "../api/auth";

export const useLocationDonor = () => {
  return useQuery({
    queryKey: ["location-donor"],
    queryFn: showLocation,
  });
};

export const useAddLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["location-donor"] });
    },
  });
};
