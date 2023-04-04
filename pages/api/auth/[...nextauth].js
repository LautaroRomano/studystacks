import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  url: 'http://localhost:3000',
  //url: process.env.NEXTAUTH_URL,
  secret: process.env.NEXTAUTH_SECRET,
});
