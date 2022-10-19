import { query as q } from 'faunadb';

import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import { fauna } from '../../../services/fauna';

const secret = process.env.NEXTAUTH_SECRET


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "read:user" } },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )
        console.log(user)


        return true

      } catch {
        return false
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET

}

export default NextAuth(authOptions)