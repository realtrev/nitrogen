import { Schema, model, models } from "mongoose";

// email verification schema
const EmailVerificationSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
  },
  confirmationString: {
    type: Schema.Types.String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  version: {
    type: Schema.Types.Number,
    default: 0,
  },
  verified: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

// export email verification model
const EmailVerification =  models.EmailVerification || model("EmailVerification", EmailVerificationSchema);

export { EmailVerification };