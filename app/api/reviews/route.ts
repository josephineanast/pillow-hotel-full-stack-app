import dbConnect from "@/backend/config/dbConnect";
import { createReviews } from "@/backend/controllers/roomControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();
router.use(isAuthenticatedUser).put(createReviews);

dbConnect();

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
