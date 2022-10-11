import { connectMongo } from '../../../../src/utils/connectMongo';
import { hashPassword, generateUniqueId } from '../../../../src/utils/encryption';
import { Users } from '../../../../src/schemas/UserSchema';
import { EmailVerification } from '../../../../src/schemas/EmailVerificationSchema';
import { sendEmail } from '../../../../src/utils/nodemail';

export default async function handler(req, res) {
  try {
    // check if the request is a post request
    if (req.method !== "POST" || !req.body) {
      return res.status(400).json({ message: "Only POST requests allowed" });
    }

    const { db } = await connectMongo();
    const email = req.body.email.trim().toLowerCase();
    const username = req.body.username.trim().toLowerCase();
    const password = req.body.password;

    const { emailMessage, validEmail } = await checkEmail(email);
    const { usernameMessage, validUsername } = await checkUsername(username);
    const { passwordMessage, validPassword } = await checkPassword(password);

    if (validEmail && validPassword && validUsername) {
      console.log("everything is valid");

      // hash the password
      const hashedPassword = hashPassword(password);

      // create a unique identifier for the email verification
      const emailId = generateUniqueId(email, 32);
      console.log('https://dev.paridax.xyz/verify/' + emailId);

      // add to the email verification database
      const emailVerification = await EmailVerification.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        username: username.toLowerCase(),
        confirmationString: emailId,
      });

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
    return {emailMessage: "Please enter a valid email", validEmail: false};
  }
  // email is too long
  if (email.length > 40) {
    return {emailMessage: "Email must be less than 40 characters long", validEmail: false};
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

async function checkUsername(username) {
  // check if the username is at least 3 characters long
  if (username.length < 3) {
    return {usernameMessage: "Username must be at least 3 characters long", validUsername: false};
  }
  // only letters numbers and underscores
  const usernameRegex = /^[a-zA-Z0-9_]+$/g;
  const usernameIsValid = usernameRegex.test(username);
  if (!usernameIsValid) {
    return {usernameMessage: "Username can only contain letters, numbers, and underscores", validUsername: false};
  }
  // username is too long
  if (username.length > 20) {
    return {usernameMessage: "Username must be less than 20 characters long", validUsername: false};
  }

  // check if username is already in use
  const usernameInUse = await Users.findOne({ username: username.toLowerCase() });
  // this means that no existing user has this username
  if (usernameInUse) {
    return {usernameMessage: "This username is unavailable", validUsername: false};
  }
  // check if the username is in the temp database
  const tempInUse = await EmailVerification.findOne({ username: username.toLowerCase() });
  // this means that nobody is trying to claim this username
  if (tempInUse) {
    return {usernameMessage: "This username is unavailable", validUsername: false};
  }

  // username is valid and not in use
  return {usernameMessage: "This username is available", validUsername: true};
}

async function checkPassword(password) {
  // check if the password is at least 8 characters long
  if (password.length < 8) {
    return {passwordMessage: "Password must be at least 8 characters long", validPassword: false};
  }

  // check if the password is too long >100
  if (password.length > 100) {
    return {passwordMessage: "Password must be less than 100 characters long", validPassword: false};
  }

  // password may not contain spaces
  const passwordRegex = /^[^\s]+$/g;
  const passwordIsValid = passwordRegex.test(password);
  if (!passwordIsValid) {
    return {passwordMessage: "Password may not contain spaces", validPassword: false};
  }

  // password is valid
  return {passwordMessage: "This password is valid", validPassword: true};
}
