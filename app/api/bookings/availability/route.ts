import dbConnect from "@/backend/config/dbConnect";
import { checkRoomAvailability } from "@/backend/controllers/bookingControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();
router.get(checkRoomAvailability);

dbConnect();

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
