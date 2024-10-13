import { model, Schema } from "mongoose";
import User from "./User.model.js";
import Message from "./message.model.js";
const ConversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: User }],
    messages: [{ type: Schema.Types.ObjectId, ref: Message, default: [] }],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Conversation = model("Conversation", ConversationSchema);
export default Conversation;
