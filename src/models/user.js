import {USER_ROLES} from "@/appConstants";
import {Schema} from "mongoose";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is missing"],
    },
    email: {
      type: String,
      required: [true, "email is missing"],
    },
    contact: {
      type: String,
      required: [true, "contact number is missing"],
    },
    password: {
      type: String,
      required: [true, "password is missing"],
    },
    role: {
      type: String,
      required: [true, "user role is missing"],
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    dob: {
      type: Date,
    },
    profile_img: {
      type: String,
    },
    verification_details: {
      pan: {
        type: String,
      },
      aadhaar: {
        type: String,
      },
    },
    bank_details: {
      bank_name: {
        type: String,
      },
      holder_name: {
        type: String,
      },
      ifsc: {
        type: String,
      },
      account_number: {
        type: String,
      },
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_user_verified: {
      type: Boolean,
      default: true,
    },
    are_bank_details_verified: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);
