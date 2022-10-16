import { connectMongo } from '../../../src/utils/connectMongo';
import { Users } from '../../../src/schemas/UserSchema';
import { authOptions } from '../auth/[...nextauth]';
import checkUsername from '../../../src/utils/username';
import { unstable_getServerSession } from "next-auth/next";
import { generateNumericId } from '../../../src/utils/identity';

export default async function handler(req, res) {
  try {
    // check if the request is a post request
    if (req.method !== "POST" || !req.body) {
      return res.status(400).json({ message: "Only POST requests allowed" });
    }
    const session = await unstable_getServerSession(req, res, authOptions);
    console.log("asdsadsadsad");
    console.log(session);

    if (!session || !session.user.registerGoogle) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { db } = await connectMongo();
    const email = session.user.email.trim();
    const username = req.body.username.trim();

    const { usernameMessage, validUsername } = await checkUsername(username);

    if (validUsername) {
      console.log("valid username");

      // create a new user
      const userId = generateNumericId("USER");
      await Users.create({
        _id: userId,
        username: username.toLowerCase(),
        email: email,
        name: username,
        password: "GOOGLE:USER",
      });

      return res.status(200).send({usernameMessage, validUsername, verified: true});
    }
    res.status(200).send({usernameMessage, validUsername});
  } catch (err) {
    console.log(err);
  }
}