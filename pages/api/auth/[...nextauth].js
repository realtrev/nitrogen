import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Users } from "../../../src/schemas/UserSchema";
import { checkPassword } from "../../../src/utils/encryption";
import { connectMongo } from "../../../src/utils/connectMongo";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // my own local login system
    CredentialsProvider({
      name: "Nitrogen",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials);
        const { db } = connectMongo();
        let user = await Users.findOne({ username: credentials.username });
        if (!user) {
          user = await Users.findOne({ email: credentials.username });
          if (!user) {
            return false;
          }
        }
        // check if the password is correct
        const passwordCorrect = checkPassword(
          credentials.password,
          user.password
        );
        if (!passwordCorrect) {
          return false;
        }
        // Any object returned will be saved in `user` property of the JWT
        return { id: user.id, username: user.username, email: user.email, name: user.name, nitrogen: true };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks: {
    async session({session, token, user}) {
      // console.log(token);
      const email = token.email;
      const username = token.username;
      const nitrogen = token.nitrogen || false;
      let error = undefined;

      // check if the email exists in the database
      if (email) {
        const userExists = await Users.findOne({ email: email });
        // console.log(userExists);
        if (!userExists) {
          if (!nitrogen) {
            token.nitrogen = false;
            token.registerGoogle = true;
            // redirect to the register google user page
          } else {
            console.log("Nonexistent user");
            error = "Nonexistent user";
            token.logOut = true;
          }
        } else {
          token.registerGoogle = undefined;
          token.username = userExists.username;
          token.name = userExists.name;
          token.userCreatedAt = userExists.createdAt;
          token.nitrogen = true;
          token.userId = userExists.id;
          token.createdAt = userExists.createdAt;
        }
      }

      return {...session, user: {...token,
        sub: undefined,
        picture: undefined,
        jti: undefined,
        exp: undefined,
        iat: undefined,
        id: undefined,
      }};
    },
    async jwt({token, user}) {
      return token;
    }
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  }
}

export default NextAuth(authOptions);