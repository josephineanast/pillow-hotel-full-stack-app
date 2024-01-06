import { Home } from "@/components/Home";
import Error from "./error";

export const metadata = {
  title: "Homepage - Pillow",
};

const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();
  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
    cache: "no-store",
  });
  return res.json();
};

export default async function Homepage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getRooms(searchParams);

  if (data?.message) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
