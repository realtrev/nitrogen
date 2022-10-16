import { connectMongo } from '../../../src/utils/connectMongo';
import { hashPassword, generateHexId } from '../../../src/utils/identity';
import { Users } from '../../../src/schemas/UserSchema';
import { EmailVerification } from '../../../src/schemas/EmailVerificationSchema';
import { sendEmail } from '../../../src/utils/nodemail';
import checkUsername from '../../../src/utils/username';
import { verifyCaptcha } from '../../../src/utils/chaptcha';

export default async function handler(req, res) {
  try {
    // check if the request is a post request
    if (req.method !== "POST" || !req.body) {
      return res.status(400).json({ message: "Only POST requests allowed" });
    }

    const email = req.body.email.trim();
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const captcha = req.body.captcha;
    if (!captcha || await verifyCaptcha(captcha) === false) {
      return res.status(401).send();
    }
    const { db } = await connectMongo();

    const { emailMessage, validEmail } = await checkEmail(email);
    const { usernameMessage, validUsername } = await checkUsername(username);
    const { passwordMessage, validPassword } = await checkPassword(password);

    if (validEmail && validPassword && validUsername) {
      console.log("everything is valid AND CAPTCHA IS VALID");

      // hash the password
      const hashedPassword = hashPassword(password);

      // create a unique identifier for the email verification
      const emailId = generateHexId(32);
      console.log('https://dev.paridax.xyz/register/email/' + emailId);

      // add to the email verification database
      const emailVerification = await EmailVerification.create({
        _id: emailId,
        email: email,
        password: hashedPassword,
        username: username.toLowerCase(),
        name: username,
      });

      //
      // SEND EMAIL CODE GOES HERE
      //

      return res.status(200).send({emailMessage, usernameMessage, passwordMessage, validEmail, validUsername, validPassword, verifyEmail: true});
    }
    res.status(200).send({emailMessage, usernameMessage, passwordMessage, validEmail, validUsername, validPassword, verifyEmail: false});
  } catch (err) {
    console.log(err);
  }
}

async function checkEmail(email) {
  // check if email is a valid email
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailIsValid = emailRegex.test(email);
  if (!emailIsValid) {
    return {emailMessage: "Invalid email", validEmail: false};
  }
  // email is too long
  if (email.length > 80) {
    return {emailMessage: "Email must be less than 80 characters long", validEmail: false};
  }
  // check if email is already in use
  const emailInUse = await Users.findOne({ email: email.toLowerCase() });
  // this means that no existing user has this email
  if (emailInUse) {
    return {emailMessage: "This email is unavailable", validEmail: false};
  }

  // check the email database to see if the email is claimed
  const tempInUse = await EmailVerification.findOne({ email: email.toLowerCase() });
  // this means that nobody is trying to claim this email
  if (tempInUse) {
    return {emailMessage: "This email is unavailable", validEmail: false};
  }

  // email address is valid and not in use
  return {emailMessage: "This email address is a valid email", validEmail: true};
}

async function checkPassword(password) {
  // check if the password is at least 8 characters long
  if (password.length < 8) {
    return {passwordMessage: "Must be at least 8 characters long", validPassword: false};
  }

  // check if the password is too long >100
  if (password.length > 100) {
    return {passwordMessage: "Must be less than 100 characters long", validPassword: false};
  }

  // password may not contain spaces
  const passwordRegex = /^[^\s]+$/g;
  const passwordIsValid = passwordRegex.test(password);
  if (!passwordIsValid) {
    return {passwordMessage: "May not contain spaces", validPassword: false};
  }

  // password is valid
  return {passwordMessage: "This password is valid", validPassword: true};
}
