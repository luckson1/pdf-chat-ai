import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  Theme,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import   EmailProvider, { SendVerificationRequestParams } from 'next-auth/providers/email'
import { prisma } from "@/server/db";
import { Resend } from "resend";
import { env } from "@/lib/env.mjs";
import { inngest } from "@/inngest/client";


export const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const {  url, identifier, theme } = params
  const { host } = new URL(url)
  try {
    await resend.emails.send({
      from: 'support@piccraftai.com',
      to: identifier,
      subject: `Sign in to ${host}`,
      text: text({ url, host }),
      html: html({ url, host, theme }),
    });
  } catch (error) {
    console.log({ error });
  }
};
// import { sendVerificationRequest } from '@/lib/utils/sendVerificationRequest';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      credits: number
    };
  }

  interface User {

   credits: number
 }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,

      user: {
        ...session.user,
        id: user.id,
        credits:user.credits
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth"
  },
  providers: [
   GoogleProvider({
      clientId: env.CLIENT_ID,
      clientSecret: env.CLIENT_SECRET,
    }),
    EmailProvider({
   
      server: '',
      from: 'support@piccraftai.com',
      sendVerificationRequest
    }),
  
    /**
     * 
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  events: {
    /**
     * 👋 Internally next-auth creates event hooks to handle any application
     * side effects that need to happen when an event occurs
     * in our case we want to send an event to inngest when a user is created
     * so that we can track user signups and other user related events.
     * @see https://next-auth.js.org/configuration/events#createuser
     * @param param0
     */
    signIn: async ({ user , isNewUser}) => {
    

   if(isNewUser) {
    await inngest.send({ name: "user/created",  data: {user} });
   } return 

    },
  },
};

function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params

  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor = theme.brandColor || "#7c3aed"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Welcome and Sign in to ${host}\n${url}\n\n`
}
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 * 
 */

sendVerificationRequest
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
