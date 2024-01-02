import mongoose, { Schema, Document } from "mongoose";
import geoCoder from "../utils/geoCoder";
import { IUser } from "./user";

export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  guestCapacity: number;
  numberOfBeds: number;
  hasInternet: boolean;
  hasBreakfast: boolean;
  hasAirCondition: boolean;
  isPetAllowed: boolean;
  hasRoomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  category: string;
  reviews: IReview[];
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

export interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
}

export interface ILocation {
  type: string;
  coordinates: number[];
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IImage extends Document {
  public_id: string;
  url: string;
}

const roomSchema: Schema<IRoom> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the room name"],
    trim: true,
    maxLength: [200, "Room name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter the room description"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter the room price per night"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please enter the room address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter the room guest capacity"],
  },
  numberOfBeds: {
    type: Number,
    required: [true, "Please enter the number of beds per room"],
  },
  hasInternet: {
    type: Boolean,
    default: false,
  },
  hasBreakfast: {
    type: Boolean,
    default: false,
  },
  hasAirCondition: {
    type: Boolean,
    default: false,
  },
  isPetAllowed: {
    type: Boolean,
    default: false,
  },
  hasRoomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the room category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please select the correct category for room",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// setting up location
roomSchema.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipCode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", roomSchema);
