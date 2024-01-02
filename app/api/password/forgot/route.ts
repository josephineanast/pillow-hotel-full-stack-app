import dbConnect from "@/backend/config/dbConnect";
import { forgotPassword } from "@/backend/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();
router.post(forgotPassword);

dbConnect();

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
