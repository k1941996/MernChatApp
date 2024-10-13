import { model, Schema } from "mongoose";

const UserSchema = Schema(
  {
    name: { type: "String", require: true },
    email: { type: "String", require: true, unique: true, lowercase: true },
    password: { type: "String", require: true },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema );
export default User;