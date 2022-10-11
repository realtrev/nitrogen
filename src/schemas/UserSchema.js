import { Schema, model, models } from "mongoose";

// user schema
const UserSchema = new Schema({
  id: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  name: {
    type: Schema.Types.String,
    required: true
  },
  username: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now
  },
  friends: {
    type: Schema.Types.Array,
    default: []
  },
  friendRequests: {
    type: Schema.Types.Array,
    default: []
  },
  communities: {
    type: Schema.Types.Array,
    default: []
  },
  version: {
    type: Schema.Types.Number,
    default: 0
  }
});

// export user model
const Users = models.Users || model("Users", UserSchema);

export { Users };