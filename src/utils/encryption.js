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
  // hash the seed and return a fixed length numeric string
  const hash = crypto.createHash('sha256').update(seed).digest('hex');
  const numericHash = parseInt(hash, 16);
  return numericHash.toString().substring(2, length + 2);
}

export { hashPassword, checkPassword, generateUniqueId };