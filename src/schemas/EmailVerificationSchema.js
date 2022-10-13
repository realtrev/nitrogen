import { Schema, model, models } from "mongoose";

// email verification schema
const EmailVerificationSchema = new Schema({
  email: {
    type: String,
    required: true,
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
  confirmationString: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60,
  },
  version: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// export email verification model
const EmailVerification =  models.EmailVerification || model("EmailVerification", EmailVerificationSchema);

export { EmailVerification };