import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    //   Providers.Email({
    //     server: process.env.EMAIL_SERVER,
    //     from: process.env.EMAIL_FROM,
    //   }),
    // ...add more providers here
  ],
  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
  pages: {
    newUser: "/auth/new-user", // If set, new users will be directed here on first sign in
  },
});
