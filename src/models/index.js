import mongoose, {model} from "mongoose";
import {userSchema} from "./user";
import {donationSchema} from "./donation";
import {fundraiserSchema} from "./fundraiser";

export const User = mongoose.models.User || model("User", userSchema, "user");
export const Fundraiser =
  mongoose.models.Fundraiser ||
  model("Fundraiser", fundraiserSchema, "fundraiser");
export const Donation =
  mongoose.models.Donation || model("Donation", donationSchema, "donation");
