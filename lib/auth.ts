import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { D1Adapter } from "@auth/d1-adapter"

export const authOptions: NextAuthOptions = {
  adapter: D1Adapter(process.env.DATABASE_URL as string),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Add your authentication logic here
        // This is a placeholder - implement your actual auth logic
        return {
          id: "1",
          email: credentials.email,
          name: "Test User"
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    }
  }
}

export default authOptions 