import { useQuery } from "@tanstack/react-query";
import { fetchRSVPs } from "@/lib/api/rsvps";

export function useRSVPs() {
  return useQuery({
    queryKey: ["rsvps"],
    queryFn: fetchRSVPs,
    retry: false,
  });
}
