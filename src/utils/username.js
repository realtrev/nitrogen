import { Users } from '../schemas/UserSchema';
import { EmailVerification } from '../schemas/EmailVerificationSchema';

export default async function checkUsername(username) {
  // check if the username is at least 3 characters long
  if (username.length < 3) {
    return {usernameMessage: "Must be at least 3 characters long", validUsername: false};
  }
  // only letters numbers and underscores
  const usernameRegex = /^[a-zA-Z0-9_]+$/g;
  const usernameIsValid = usernameRegex.test(username);
  if (!usernameIsValid) {
    return {usernameMessage: "Username can only contain letters, numbers, or _", validUsername: false};
  }
  // username is too long
  if (username.length > 20) {
    return {usernameMessage: "Must be less than 20 characters long", validUsername: false};
  }

  // username can only end with a letter or number
  const usernameEndRegex = /[a-zA-Z0-9]$/g;
  const usernameEndIsValid = usernameEndRegex.test(username);
  if (!usernameEndIsValid) {
    return {usernameMessage: "Username can only end with a letter or number", validUsername: false};
  }

  // username can only start with a letter or number
  const usernameStartRegex = /^[a-zA-Z0-9]/g;
  const usernameStartIsValid = usernameStartRegex.test(username);
  if (!usernameStartIsValid) {
    return {usernameMessage: "Username can only start with a letter or number", validUsername: false};
  }

  // only 1 underscore
  const underscoreRegex = /_/g;
  const underscoreCount = (username.match(underscoreRegex) || []).length;
  if (underscoreCount > 1) {
    return {usernameMessage: "Username can only have 1 underscore", validUsername: false};
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