import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtendedUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email i hasło są wymagane");
        }

        // Symulacja użytkownika - zamień na pobieranie z bazy danych
        const user: ExtendedUser = { id: "1", email: "user@example.com" };

        if (credentials.email === user.email && credentials.password === "password123") {
          return user;
        }

        throw new Error("Nieprawidłowe dane logowania");
      },
    }),
  ],
  pages: {
    signIn: "/login", 
    newUser: "/register"
  },
  secret: process.env.NEXTAUTH_SECRET, // Ustaw w pliku .env.local
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as ExtendedUser).id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as ExtendedUser).id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // Zalecana strategia sesji
  },
};

export default NextAuth(authOptions);
