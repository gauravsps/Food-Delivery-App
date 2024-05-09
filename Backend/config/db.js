import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://pantg835:OloWus5NiQpxSxmg@cluster0.rbdesvz.mongodb.net/food-delivery"
    )
    .then(() => {
      console.log("DB connected");
    });
};
