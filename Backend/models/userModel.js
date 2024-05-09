import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: { type: Object, default: {} },
  },
  {
    minimize: false,
  }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;

/***
 * In Mongoose, the "minimize" option is used in schemas to control how empty objects are represented
 * when saving documents to MongoDB. By default, Mongoose will remove empty objects from documents
 * when saving to MongoDB to conserve space.
 * However, setting minimize: false instructs Mongoose to retain empty objects in the document
 */
