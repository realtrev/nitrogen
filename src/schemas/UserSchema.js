import { Schema, model, models } from "mongoose";

// user schema
const UserSchema = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "offline"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  friends: {
    type: Array,
    default: []
  },
  friendRequests: {
    type: Array,
    default: []
  },
  outgoingFriendRequests: {
    type: Array,
    default: []
  },
  blockedUsers: {
    type: Array,
    default: []
  },
  userNotes: {
    type: Array,
    default: []
  },
  communities: {
    type: Array,
    default: []
  }
});

// export user model
const Users = models.Users || model("Users", UserSchema);

export { Users };