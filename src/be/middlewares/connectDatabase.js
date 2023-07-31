import mongoose from "mongoose";

const connectionUrl =
  "mongodb+srv://" +
  process.env.MONGODB_USERNAME +
  ":" +
  process.env.MONGODB_PASSWORD +
  "@" +
  process.env.MONGODB_HOST +
  "/" +
  process.env.MONGODB_DBNAME;

export const connectDB = async (_request, _response, next) => {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(connectionUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
    }
    return next();
  } catch (error) {
    throw new Error(error.message);
  }
};
