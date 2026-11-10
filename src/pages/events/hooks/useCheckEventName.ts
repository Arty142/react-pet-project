import { useQuery } from '@tanstack/react-query';
import {eventsApi} from "../../../api/eventsApi.ts";
import {useDebounce} from "./useDebounce.ts";

export const useCheckEventName = (name: string) => {
        const debouncedName = useDebounce(name.trim(), 500);

        const query = useQuery({
                queryKey: ['event-name', debouncedName.toLowerCase()],

                queryFn: () => eventsApi.checkEventName(debouncedName),

                enabled: debouncedName.length >= 3,

                staleTime: 0,
        });

        return {
                ...query,
                checkedName: debouncedName,
        };
};
