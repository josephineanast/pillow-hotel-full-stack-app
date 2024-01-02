import Error from "@/app/error";
import BookingDetails from "@/components/bookings/BookingDetails";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Booking Details - Pillow",
};

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}/api/bookings/${id}`,
    authHeader
  );
  return res.json();
};

export default async function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getBooking(params?.id);

  if (data?.message) {
    return <Error error={data} />;
  }

  return <BookingDetails data={data} />;
}
