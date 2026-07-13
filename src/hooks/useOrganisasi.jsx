import { useQuery } from "@tanstack/react-query";
import { showOrganisasi } from "../api/auth";

export const useOrganisasi = () => {
  return useQuery({
    queryKey: ["organisasi"],
    queryFn: showOrganisasi,
  });
};
