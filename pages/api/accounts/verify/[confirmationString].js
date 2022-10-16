import { connectMongo } from '../../../../src/utils/connectMongo';
import { hashPassword, generateNumericId } from '../../../../src/utils/identity';
import { Users } from '../../../../src/schemas/UserSchema';
import { EmailVerification } from '../../../../src/schemas/EmailVerificationSchema';

export default async function handler(req, res) {
  // request is a get request
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Only GET requests allowed", success: false });
  }

  const { db } = await connectMongo();

  // get the confirmation string from the url
  const { confirmationString } = req.query;

  // find the email verification in the database
  const emailVerification = await EmailVerification.findOne({ _id: confirmationString });

  // if the email verification is not found
  if (!emailVerification) {
    return res.status(200).json({ message: "Email verification not found", success: false });
  }

  // get the username, email, and password from the email verification
  const { username, email, password, name } = emailVerification;

  // create a new user
  const userId = generateNumericId("USER");
  console.log(userId);
  await Users.create({
    _id: userId,
    username: username,
    email: email,
    name: name,
    password: password,
  });

  // delete the email verification
  await EmailVerification.deleteOne({ _id: confirmationString });

  // send the user to the login page
  res.status(200).json({ message: "Email verified", success: true });
}