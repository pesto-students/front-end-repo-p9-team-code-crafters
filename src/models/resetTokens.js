import {Schema} from "mongoose";

export const resetTokenSchema = new Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: [true, "user id is missing"],
    },
    code: {
      type: String,
      required: [true, "code is missing"],
    },
    is_valid: {
      type: Boolean,
      default: true,
    },
  },
  {timestamps: true}
);
