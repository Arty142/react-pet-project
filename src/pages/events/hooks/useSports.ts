import { useQuery } from '@tanstack/react-query';
import { eventsApi } from "../../../api/eventsApi.ts";

export const useSports = () => {
        return useQuery({
                queryKey: ['sports'],
                queryFn: () => eventsApi.getSports(),
        });
};
