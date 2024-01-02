import { NextRequest, NextResponse } from "next/server";

type ControllerFunction = (
  req: NextRequest,
  params: any
) => Promise<NextResponse>;

interface IValidationError {
  message: string;
}

export const catchAsyncErrors =
  (controller: ControllerFunction) => async (req: NextRequest, params: any) => {
    try {
      return await controller(req, params);
    } catch (error: any) {
      if (error.name === "CastError") {
        error.message = `Resource not found. Invalid ${error?.path}`;
        error.statusCode = 400;
      }

      if (error?.name === "ValidationError") {
        error.message = Object.values<IValidationError>(error.errors).map(
          (value) => value.message
        );
        error.statusCode = 400;
      }

      if (error.code === 11000) {
        error.message = `Duplicate ${Object.keys(error.keyValue)} entered`;
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.statusCode || 500 }
      );
    }
  };
