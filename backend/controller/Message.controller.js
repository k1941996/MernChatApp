import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/server.js";

export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    const message = req.body.message;
    const senderId = req.body.senderId;

    let conversation;
    if (senderId === receiverId) {
      conversation = await Conversation.findOne({
        participants: { $size: 1, $in: [senderId] },
      });
    } else {
      conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
    }

    if (!conversation) {
      if (senderId === receiverId) {
        conversation = await Conversation.create({
          participants: [senderId],
        });
      } else {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId && !(senderId === receiverId)) {
      io.to(receiverSocketId).emit("message", newMessage);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    return res.status(200).json({ message: "message Sent Successfully", newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.body.senderId;
    let conversation;
    if (senderId === receiverId) {
      // If sender and receiver are the same, find conversation with only one participant.
      conversation = await Conversation.findOne({
        participants: { $size: 1, $in: [senderId] },
      }).populate("messages");
    } else {
      // If sender and receiver are different, find conversation with both participants.
      conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      }).populate("messages");
    }

    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
