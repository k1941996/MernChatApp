import { model, Schema } from "mongoose";
import User from "./User.model.js";
const MessageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: User, required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: User, required: true },
    message: { type: "String", maxLength: 1000, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", MessageSchema);
export default Message;
