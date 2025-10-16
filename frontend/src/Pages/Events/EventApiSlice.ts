import { apiSlice } from "../../app/api/apiSlice";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/events/get-events",
      providesTags: ["Event"],
    }),
    addEvent: builder.mutation({
      query: (data) => ({
        url: "/events/add-events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/get-events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
    getEventById: builder.query({
      query: (id) => `/events/get-events/${id}`,
      providesTags: ["Event"],
    }),
    addPeopleToEvent: builder.mutation({
      query: ({ eventId, attendee }) => ({
        url: `/events/add-attendee/${eventId}`,
        method: "POST",
        body: attendee,
      }),
      invalidatesTags: ["Event"],
    }),
    deletePeopleFromEvent: builder.mutation({
      query: ({ eventId, attendeeId }) => ({
        url: `/events/add-attendee/${eventId}`,
        method: "DELETE",
        body: { attendeeId },
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useGetEventByIdQuery,
  useDeleteEventMutation,
  useAddPeopleToEventMutation,
  useDeletePeopleFromEventMutation,
} = eventApiSlice;
