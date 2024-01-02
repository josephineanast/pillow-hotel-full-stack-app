import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomAPI = createApi({
  reducerPath: "roomAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    canUserReview: builder.query({
      query(id) {
        return {
          url: `/reviews/can_review?roomId=${id}`,
        };
      },
    }),
    postReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const { useCanUserReviewQuery, usePostReviewMutation } = roomAPI;
