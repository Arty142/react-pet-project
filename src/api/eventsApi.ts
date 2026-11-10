import type {CreatedEvent, Discipline, EventDraft, Sport} from "../types/events/event.types";

const delay = (ms = 1000) =>
        new Promise<void>((resolve) => setTimeout(resolve, ms));

export const eventsApi = {
        async getSports(): Promise<Sport[]> {
                await delay(800);

                return [
                        { id: 1, name: 'Football' },
                        { id: 2, name: 'Swimming' },
                        { id: 3, name: 'Athletics' },
                        { id: 4, name: 'Tennis' },
                ];
        },

        async getDisciplines(sportId: number): Promise<Discipline[]> {
                await delay(600);

                const disciplines: Record<number, Discipline[]> = {
                        1: [
                                { id: 101, sportId: 1, name: '11 vs 11' },
                                { id: 102, sportId: 1, name: 'Futsal' },
                        ],
                        2: [
                                { id: 201, sportId: 2, name: 'Freestyle' },
                                { id: 202, sportId: 2, name: 'Backstroke' },
                                { id: 203, sportId: 2, name: 'Butterfly' },
                        ],
                        3: [
                                { id: 301, sportId: 3, name: 'Running' },
                                { id: 302, sportId: 3, name: 'Long Jump' },
                                { id: 303, sportId: 3, name: 'High Jump' },
                        ],
                        4: [
                                { id: 401, sportId: 4, name: 'Singles' },
                                { id: 402, sportId: 4, name: 'Doubles' },
                        ],
                };

                return disciplines[sportId] ?? [];
        },

        async checkEventName(name: string): Promise<{ available: boolean }> {
                await delay(700);

                const existingNames = [
                        'Summer Championship',
                        'Winter Cup',
                        'National Tournament',
                ];

                const available = !existingNames.some(
                        (existingName) =>
                                existingName.toLowerCase() === name.trim().toLowerCase(),
                );

                return { available };
        },

        async createEvent(data: EventDraft): Promise<CreatedEvent> {
                await delay(1500);

                // Імітуємо помилку сервера
                if (data.name.toLowerCase() === 'server-error') {
                        throw new Error('Internal Server Error');
                }

                return {
                        ...data,
                        id: Math.floor(Math.random() * 100000),
                        createdAt: new Date().toISOString(),
                };
        },
};
