import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import { upload_file, delete_file } from "../utils/cloudinary";
import { resetPasswordTemplate } from "../utils/emailTemplate";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const { name, email, password } = body;

  const user = await User.create({
    name,
    email,
    password,
  });

  return NextResponse.json({
    success: true,
  });
});

export const updateProfile = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const userData = {
    name: body.name,
    email: body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, userData);

  return NextResponse.json({
    success: true,
    user,
  });
});

export const updatePassword = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const user = await User.findById(req?.user?._id).select("+password");

  const isMatched = await user.comparePassword(body.oldPassword);

  if (!isMatched) {
    throw new ErrorHandler("Old password is incorrect", 400);
  }

  user.password = body.password;
  await user.save();

  return NextResponse.json({
    success: true,
  });
});

export const uploadAvatar = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const avatarResponse = await upload_file(
    body?.avatar,
    "pillow-assets/avatars"
  );

  if (req?.user?.avatar?.public_id) {
    await delete_file(req?.user?.avatar?.public_id);
  }

  const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarResponse,
  });

  return NextResponse.json({
    success: true,
    user,
  });
});

export const forgotPassword = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const user = await User.findOne({ email: body.email });

  if (!user) {
    throw new ErrorHandler("User not found with this email", 404);
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save(); // save user and the reset token associated with the user to the database

  // create reset password url
  const resetURL = `${process.env.API_URL}/password/reset/${resetToken}`;

  const message = resetPasswordTemplate(user?.name, resetURL);

  try {
    await sendEmail({
      email: user.email,
      subject: "Pillow Password Recovery",
      message,
    });
  } catch (error: any) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    throw new ErrorHandler(error?.message, 500);
  }

  return NextResponse.json({
    success: true,
    user,
  });
});

export const resetPassword = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { token: string } }) => {
    const body = await req.json();

    // hash reset password token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // expiry time should be greater than now
    });

    if (!user) {
      throw new ErrorHandler(
        "Password reset token is invalid or has expired",
        404
      );
    }

    if (body.password !== body.confirmPassword) {
      throw new ErrorHandler("Password does not match", 404);
    }

    // set new password
    user.password = body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
    });
  }
);
