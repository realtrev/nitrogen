// hash the password and return the hashed password
import * as crypto from 'crypto';

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');
  return `${salt}:${hash}`;
}

function checkPassword(password, hash) {
  const [salt, hashPassword] = hash.split(':');
  const hashCheck = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');
  return hashCheck === hashPassword;
}

function generateUniqueId(seed = null, length = 16, numeric = false) {
  if (!seed) {
    const id = crypto.randomBytes(length).toString('hex');
    return id;
  }
  // hash the seed and return a fixed length string
  if (!numeric) {
    const hash = crypto.createHash('sha256').update(seed).digest('hex');
    return hash.substring(0, length);
  }
  // create a numeric id of a fixed length with random numbers
  const id = Math.floor(Math.random() * Math.pow(10, length));
  return id;
}

const types = [
  {text: "USER", number: "1", letter: "U"},
  {text: "COMMUNITY", number: "2", letter: "C"},
  {text: "POST", number: "3", letter: "P"},
  {text: "COMMENT", number: "4", letter: "M"},
  {text: "MESSAGE", number: "5", letter: "S"},
  {text: "CHANNEL", number: "6", letter: "H"}
]

function generateNumericId(type = "USER" || "COMMUNITY" || "POST" || "COMMENT" || "MESSAGE" || "CHANNEL", rval = null) {
  // get the current unix time in seconds
  const time = Math.floor(Date.now() / 1000);
  // pad the time with zeros to make it 10 digits long
  const paddedTime = time.toString().padStart(10, '0');
  // generate random number 5 digits long
  const random = Math.floor(Math.random() * 100000);
  // pad the random number with zeros to make it 5 digits long
  const paddedRandom = rval || random.toString().padStart(5, '0');
  // get the type number
  const typeNumber = types.find(t => t.text === type.toUpperCase()).number;

  return `${paddedRandom}${typeNumber}${paddedTime}`;
}

function generateHexId(length = 32) {
  const time = Math.floor(Date.now() / 10000); // remove the milliseconds and first second (its unnecessary)
  const paddedTime = time.toString().padStart(10, '0');
  const random = Math.floor(Math.random() * 1000000);
  const paddedRandom = random.toString().padStart(6, '0');
  return crypto.createHash('sha256').update(`${paddedRandom}${paddedTime}`).digest('hex');
}

function parseNumericId(id) {
  const timestamp = id.substring(6, 16);
  // parse the timestamp to a number
  const parsedTimestamp = parseInt(timestamp) * 10000;
  const type = id.substring(5, 6);
  const rString = id.substring(0, 5);
  return {timestamp: parsedTimestamp, type, rString};
}

export { hashPassword, checkPassword, generateHexId, generateNumericId };