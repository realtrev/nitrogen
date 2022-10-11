import { connectMongo } from '../../../../../src/utils/connectMongo';
import { hashPassword, generateUniqueId } from '../../../../../src/utils/encryption';
import { Users } from '../../../../../src/schemas/UserSchema';
import { EmailVerification } from '../../../../../src/schemas/EmailVerificationSchema';

export default async function handler(req, res) {
  // request is a get request
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Only GET requests allowed", success: false });
  }

  const { db } = await connectMongo();

  // get the confirmation string from the url
  const { confirmationString } = req.query;
  console.log(confirmationString);

  // find the email verification in the database
  const emailVerification = await EmailVerification.findOne({ confirmationString });

  // if the email verification is not found
  if (!emailVerification) {
    return res.status(200).json({ message: "Email verification not found", success: false });
  }

  // get the username, email, and password from the email verification
  const { username, email, password } = emailVerification;

  // create a new user
  const user = await Users.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    name: username,
    password,
    id: generateUniqueId(email, 16, true),
  });

  // delete the email verification
  await EmailVerification.deleteOne({ confirmationString });

  // send the user to the login page
  res.status(200).json({ message: "Email verified", success: true });
}