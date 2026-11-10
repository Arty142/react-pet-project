export type EventType = 'competition' | 'training' | 'seminar';

export interface Sport {
        id: number;
        name: string;
}

export interface Discipline {
        id: number;
        sportId: number;
        name: string;
}

export interface EventDraft {
        name: string;
        type: EventType;
        startDate: string;
        endDate: string;
        location: string;
        sportId?: number;
        disciplineId?: number;
}

export interface CreatedEvent extends EventDraft {
        id: number;
        createdAt: string;
}
