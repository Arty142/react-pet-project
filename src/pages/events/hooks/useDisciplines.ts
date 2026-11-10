import { useQuery } from '@tanstack/react-query';
import { eventsApi } from "../../../api/eventsApi.ts";

export const useDisciplines = (sportId?: number) => {
        return useQuery({
                queryKey: ['disciplines', sportId],
                queryFn: () => {
                        if (!sportId) {
                                throw new Error('Sport ID is required');
                        }

                        return eventsApi.getDisciplines(sportId);
                },
                enabled: Boolean(sportId),
        });
};
