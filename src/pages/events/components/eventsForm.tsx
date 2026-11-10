
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { eventSchema } from "../../../schemas/event.schema";
import { useCheckEventName } from "../hooks/useCheckEventName";
import { useCreateEvent } from "../hooks/useCreateEvent";
import { useSports } from "../hooks/useSports";
import { useDisciplines } from "../hooks/useDisciplines";
import "./eventsForm.css";
type EventFormValues = {
        name: string;
        type: "competition" | "training" | "seminar";
        startDate: string;
        endDate: string;
        location: string;
        sportId?: number;
        disciplineId?: number;
};

function EventForm() {
        const {
                register,
                handleSubmit,
                control,
                setValue,
                setError,
                clearErrors,
                formState: { errors, isSubmitting },
        } = useForm<EventFormValues>({
                resolver: zodResolver(eventSchema),
                defaultValues: {
                        name: "",
                        type: "competition",
                        startDate: "",
                        endDate: "",
                        location: "",
                        sportId: undefined,
                        disciplineId: undefined,
                },
        });

        // Watch form values
        const eventName = useWatch({ control, name: "name" });
        const eventType = useWatch({ control, name: "type" });
        const sportId = useWatch({ control, name: "sportId" });

        // API queries
        const {
                data: sports = [],
                isLoading: isLoadingSports,
                isError: isSportsError,
        } = useSports();

        const {
                data: disciplines = [],
                isLoading: isLoadingDisciplines,
                isError: isDisciplinesError,
        } = useDisciplines(sportId);

        const {
                data: nameCheck,
                isFetching: isCheckingName,
                checkedName,
        } = useCheckEventName(eventName);

        const createEventMutation = useCreateEvent();

        // Register fields once
        const typeField = register("type");

        const sportField = register("sportId", {
                setValueAs: (value) => (value === "" ? undefined : Number(value)),
        });

        const disciplineField = register("disciplineId", {
                setValueAs: (value) => (value === "" ? undefined : Number(value)),
        });

        // Clear discipline when sport changes
        useEffect(() => {
                setValue("disciplineId", undefined, {
                        shouldValidate: true,
                });
        }, [sportId, setValue]);

        const onSubmit = async (values: EventFormValues) => {
                clearErrors("root.server");

                // Check whether the current event name is already taken
                const currentNameWasChecked =
                        checkedName?.trim().toLowerCase() ===
                        values.name.trim().toLowerCase();

                if (
                        currentNameWasChecked &&
                        nameCheck?.available === false
                ) {
                        setError("name", {
                                type: "manual",
                                message: "This event name is already taken",
                        });
                        return;
                }

                try {
                        await createEventMutation.mutateAsync(values);
                } catch {
                        setError("root.server", {
                                type: "manual",
                                message: "Something went wrong. Please try again.",
                        });
                }
        };

        const isCompetition = eventType === "competition";

        const isNameAvailable =
                eventName?.trim().length >= 3 &&
                checkedName?.trim().toLowerCase() ===
                eventName.trim().toLowerCase() &&
                !isCheckingName;

        return (
                <form className="event-form" onSubmit={handleSubmit(onSubmit)}>
                        <h1>Create new event</h1>

                        <p className="form-description">
                                Fill in the details to create your event.
                        </p>

                        {/* Event name */}
                        <div className="form-field">
                                <label htmlFor="event-name">Event name</label>

                                <input
                                        id="event-name"
                                        type="text"
                                        placeholder="Enter event name"
                                        {...register("name")}
                                />

                                {errors.name && (
                                        <span className="field-error">
            {errors.name.message}
          </span>
                                )}

                                {isCheckingName && (
                                        <span className="field-hint">
            Checking event name...
          </span>
                                )}

                                {isNameAvailable && nameCheck?.available && (
                                        <span className="field-success">
            Event name is available
          </span>
                                )}

                                {isNameAvailable && nameCheck?.available === false && (
                                        <span className="field-error">
            This event name is already taken
          </span>
                                )}
                        </div>

                        {/* Event type */}
                        <div className="form-field">
                                <label htmlFor="event-type">Event type</label>

                                <select
                                        id="event-type"
                                        {...typeField}
                                        onChange={(event) => {
                                                typeField.onChange(event);

                                                // Reset competition-specific fields
                                                setValue("sportId", undefined);
                                                setValue("disciplineId", undefined);
                                        }}
                                >
                                        <option value="competition">Competition</option>
                                        <option value="training">Training</option>
                                        <option value="seminar">Seminar</option>
                                </select>

                                {errors.type && (
                                        <span className="field-error">
            {errors.type.message}
          </span>
                                )}
                        </div>

                        {/* Competition settings */}
                        {isCompetition && (
                                <section className="competition-settings">
                                        <h2>Competition settings</h2>

                                        {/* Sport */}
                                        <div className="form-field">
                                                <label htmlFor="sport">Sport</label>

                                                <select
                                                        id="sport"
                                                        {...sportField}
                                                        onChange={(event) => {
                                                                sportField.onChange(event);
                                                                setValue("disciplineId", undefined);
                                                        }}
                                                >
                                                        <option value="">Select sport</option>

                                                        {sports.map((sport) => (
                                                                <option key={sport.id} value={sport.id}>
                                                                        {sport.name}
                                                                </option>
                                                        ))}
                                                </select>

                                                {isLoadingSports && (
                                                        <span className="field-hint">
                Loading sports...
              </span>
                                                )}

                                                {isSportsError && (
                                                        <span className="field-error">
                Failed to load sports
              </span>
                                                )}

                                                {errors.sportId && (
                                                        <span className="field-error">
                {errors.sportId.message}
              </span>
                                                )}
                                        </div>

                                        {/* Discipline */}
                                        {sportId !== undefined && (
                                                <div className="form-field">
                                                        <label htmlFor="discipline">Discipline</label>

                                                        <select
                                                                id="discipline"
                                                                {...disciplineField}
                                                        >
                                                                <option value="">Select discipline</option>

                                                                {disciplines.map((discipline) => (
                                                                        <option
                                                                                key={discipline.id}
                                                                                value={discipline.id}
                                                                        >
                                                                                {discipline.name}
                                                                        </option>
                                                                ))}
                                                        </select>

                                                        {isLoadingDisciplines && (
                                                                <span className="field-hint">
                  Loading disciplines...
                </span>
                                                        )}

                                                        {isDisciplinesError && (
                                                                <span className="field-error">
                  Failed to load disciplines
                </span>
                                                        )}

                                                        {errors.disciplineId && (
                                                                <span className="field-error">
                  {errors.disciplineId.message}
                </span>
                                                        )}
                                                </div>
                                        )}
                                </section>
                        )}

                        {/* Dates */}
                        <div className="form-row">
                                <div className="form-field">
                                        <label htmlFor="start-date">Start date</label>

                                        <input
                                                id="start-date"
                                                type="date"
                                                {...register("startDate")}
                                        />

                                        {errors.startDate && (
                                                <span className="field-error">
              {errors.startDate.message}
            </span>
                                        )}
                                </div>

                                <div className="form-field">
                                        <label htmlFor="end-date">End date</label>

                                        <input
                                                id="end-date"
                                                type="date"
                                                {...register("endDate")}
                                        />

                                        {errors.endDate && (
                                                <span className="field-error">
              {errors.endDate.message}
            </span>
                                        )}
                                </div>
                        </div>

                        {/* Location */}
                        <div className="form-field">
                                <label htmlFor="location">Location</label>

                                <input
                                        id="location"
                                        type="text"
                                        placeholder="Enter location"
                                        {...register("location")}
                                />

                                {errors.location && (
                                        <span className="field-error">
            {errors.location.message}
          </span>
                                )}
                        </div>

                        {/* Server error */}
                        {errors.root?.server && (
                                <div className="form-server-error">
                                        {errors.root.server.message}
                                </div>
                        )}

                        {/* Submit */}
                        <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting || createEventMutation.isPending}
                        >
                                {createEventMutation.isPending
                                        ? "Creating event..."
                                        : "Create event"}
                        </button>
                </form>
        );
}

export default EventForm;
