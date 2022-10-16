import { connectMongo } from '../../../src/utils/connectMongo';
import { hashPassword, generateHexId } from '../../../src/utils/identity';
import { Users } from '../../../src/schemas/UserSchema';
import { EmailVerification } from '../../../src/schemas/EmailVerificationSchema';
import { sendEmail } from '../../../src/utils/nodemail';
import checkUsername from '../../../src/utils/username';

export default async function handler(req, res) {
  // check if the email is already in the verification database
  const { db } = await connectMongo();

  // get the email from the request body
  const { email, captcha } = req.body;

  // check if the email is already in the database
  const user = await EmailVerification.findOne({ email: email });

  // if the email is not already in the database return an error
  if (!user) {
    return res.status(400).json({ error: 'Email is not in verification' });
  }


  // generate a new verification id and copy the old email verification data
  const emailId = generateHexId();
  const { password, username, name } = user;
  await EmailVerification.deleteOne({ email: email });

  // create a new email verification document
  new EmailVerification({
    _id: emailId,
    email: email,
    password: password,
    username: username,
    name: name,
  });

  //
  // EMAIL CODE GOES HERE
  //

  console.log(`NEW CODE: https://dev.paridax.xyz/register/email/${emailId}`);

  res.status(200).json({ message: 'Email sent' });
}