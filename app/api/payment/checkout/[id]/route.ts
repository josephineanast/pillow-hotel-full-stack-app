import dbConnect from "@/backend/config/dbConnect";
import { stripeCheckout } from "@/backend/controllers/paymentControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();
router.use(isAuthenticatedUser).get(stripeCheckout);

dbConnect();

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
