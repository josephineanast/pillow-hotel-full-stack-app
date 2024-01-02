import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingAPI = createApi({
  reducerPath: "bookingAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    newBooking: builder.mutation({
      query(body) {
        return {
          url: "/bookings",
          method: "POST",
          body,
        };
      },
    }),
    checkAvailability: builder.query({
      query({ id, checkInDate, checkOutDate }) {
        return {
          url: `/bookings/availability?roomId=${id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
        };
      },
    }),
    getBookedDates: builder.query({
      query(id) {
        return {
          url: `/bookings/booked?roomId=${id}`,
        };
      },
    }),
    stripeCheckout: builder.query({
      query({ id, checkoutData }) {
        return {
          url: `/payment/checkout/${id}`,
          params: {
            checkInDate: checkoutData.checkInDate,
            checkOutDate: checkoutData.checkOutDate,
            daysOfStay: checkoutData.daysOfStay,
            amount: checkoutData.amount,
          },
        };
      },
    }),
  }),
});

export const {
  useNewBookingMutation,
  useLazyCheckAvailabilityQuery,
  useGetBookedDatesQuery,
  useLazyStripeCheckoutQuery,
} = bookingAPI;
