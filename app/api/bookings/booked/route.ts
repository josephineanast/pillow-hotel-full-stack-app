import dbConnect from "@/backend/config/dbConnect";
import { getAllBookedDates } from "@/backend/controllers/bookingControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();
router.get(getAllBookedDates);

dbConnect();

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
