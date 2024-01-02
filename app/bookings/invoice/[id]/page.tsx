import Error from "@/app/error";
import Invoice from "@/components/invoice/Invoice";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Booking Invoice - Pillow",
};

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}/api/bookings/${id}`,
    authHeader
  );
  return res.json();
};

export default async function BookingInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getBooking(params?.id);

  if (data?.message) {
    return <Error error={data} />;
  }

  return <Invoice data={data} />;
}
