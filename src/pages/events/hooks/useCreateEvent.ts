import {
        useMutation,
        useQueryClient,
} from '@tanstack/react-query';
import {eventsApi} from "../../../api/eventsApi.ts";
import type {EventDraft} from "../../../types/events/event.types.ts";

export const useCreateEvent = () => {
        const queryClient = useQueryClient();

        return useMutation({
                mutationFn: (data: EventDraft) => eventsApi.createEvent(data),

                onSuccess: (createdEvent) => {
                        console.log('Event created:', createdEvent);

                        queryClient.invalidateQueries({
                                queryKey: ['events'],
                        });
                },
        });
};
