import { updateStatus } from "@/api/update";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organisasi"],
      });
    },
  });
};
