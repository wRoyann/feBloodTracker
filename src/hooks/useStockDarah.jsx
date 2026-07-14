import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showStockDarah, updateStockDarah } from "../api/stock";

export const useStockDarah = () => {
  return useQuery({
    queryKey: ["stok-darah"],
    queryFn: showStockDarah,
  });
};

export const useUpdateStockDarah = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }) => updateStockDarah(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stok-darah"],
      });
    },
  });
};
