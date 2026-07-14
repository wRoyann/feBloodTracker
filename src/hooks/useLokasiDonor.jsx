import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addLocation,
  showLocation,
  updateLocation,
  deleteLocation,
} from "../api/auth";

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

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => updateLocation(id, payload),
    onMutate: async ({ id, ...payload }) => {
      await queryClient.cancelQueries({ queryKey: ["location-donor"] });
      const previousData = queryClient.getQueryData(["location-donor"]);
      if (previousData?.data) {
        queryClient.setQueryData(["location-donor"], {
          ...previousData,
          data: previousData.data.map((item) =>
            item.id === id ? { ...item, ...payload } : item,
          ),
        });
      }
      return { previousData };
    },
    onError: (err, vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["location-donor"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["location-donor"] });
    },
  });
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteLocation(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["location-donor"] });
      const previousData = queryClient.getQueryData(["location-donor"]);
      if (previousData?.data) {
        queryClient.setQueryData(["location-donor"], {
          ...previousData,
          data: previousData.data.filter((item) => item.id !== id),
        });
      }
      return { previousData };
    },
    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["location-donor"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["location-donor"] });
    },
  });
};
