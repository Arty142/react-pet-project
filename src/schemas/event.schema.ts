import { z } from 'zod';

export const eventSchema = z.object({
        name: z
                .string()
                .trim()
                .min(3, 'Name must contain at least 3 characters')
                .max(100, 'Name is too long'),

        type: z.enum(['competition', 'training', 'seminar']),

        startDate: z.string().min(1, 'Start date is required'),

        endDate: z.string().min(1, 'End date is required'),

        location: z
                .string()
                .trim()
                .min(3, 'Location is required'),

        sportId: z.number().optional(),

        disciplineId: z.number().optional(),
}).superRefine((data, ctx) => {
        if (data.startDate && data.endDate && data.endDate < data.startDate) {
                ctx.addIssue({
                        code: 'custom',
                        path: ['endDate'],
                        message: 'End date cannot be before start date',
                });
        }

        if (data.type === 'competition') {
                if (!data.sportId) {
                        ctx.addIssue({
                                code: 'custom',
                                path: ['sportId'],
                                message: 'Sport is required',
                        });
                }

                if (!data.disciplineId) {
                        ctx.addIssue({
                                code: 'custom',
                                path: ['disciplineId'],
                                message: 'Discipline is required',
                        });
                }
        }
});

export type EventFormValues = z.infer<typeof eventSchema>;
