import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showPermintaanDarah, createPermintaanDarah } from "../api/permintaan";

export const usePermintaanDarah = () => {
  return useQuery({
    queryKey: ["permintaan-darurat"],
    queryFn: () => showPermintaanDarah({ page: 1 }),
    select: (res) => res?.data || [],
  });
};

export const useCreatePermintaanDarah = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createPermintaanDarah(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permintaan-darurat"],
      });
    },
  });
};
