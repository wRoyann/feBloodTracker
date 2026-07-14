import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGolonganDarah, showGolonganDarah } from "../api/auth";

export const useGolonganDarah = () => {
  return useQuery({
    queryKey: ["golongan-darah"],
    queryFn: showGolonganDarah,
  });
};

export const useCreateGolonganDarah = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGolonganDarah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["golongan-darah"] });
    },
  });
};
