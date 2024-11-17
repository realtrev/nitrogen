import { Schema, model, models } from "mongoose";

// email verification schema
const EmailVerificationSchema = new Schema({
  _id: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: '15m',
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// export email verification model
const EmailVerification =  models.EmailVerification || model("EmailVerification", EmailVerificationSchema);

export { EmailVerification };