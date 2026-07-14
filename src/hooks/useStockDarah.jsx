import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { showStockDarah, updateStockDarah } from "../api/stock";

const extractData = (res) => {
  const d = res?.data;
  return Array.isArray(d) ? d : d?.data || [];
};

const fetchAllStockDarah = async () => {
  const first = await showStockDarah({ page: 1 });
  const firstData = extractData(first);
  const meta = first?.meta || first?.data?.meta;

  if (!meta || meta.last_page <= 1) return firstData;

  const pages = Array.from({ length: meta.last_page - 1 }, (_, i) => i + 2);
  const rest = await Promise.all(
    pages.map((page) => showStockDarah({ page })),
  );

  const restItems = rest.flatMap((res) => extractData(res));

  return [...firstData, ...restItems];
};

export const useStockDarah = () => {
  return useQuery({
    queryKey: ["stok-darah", "all"],
    queryFn: fetchAllStockDarah,
  });
};

export const useUpdateStockDarah = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }) => updateStockDarah(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stok-darah"],
        refetchType: "all",
      });
    },
  });
};
