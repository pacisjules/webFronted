import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {},

      async authorize(credentials, req) {
        
        const baseUrl = process.env.BACKEND_URL;
        
        var bodyFormData = new FormData();
        bodyFormData.append("username", credentials.username);
        bodyFormData.append("password", credentials.password);

        var logindata = bodyFormData;
        
        const response = await fetch(baseUrl + "/auth/login", {
          method: "POST",
          body: logindata,
        });
        
        const data = await response.json();
        if(response.status=="404"){
          return null;
        }else{
          return {
            token:data.access_token,
          };
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user}) => {
      user && (token.user = user);
      return token;
    },

    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/", //Need to define custom login page (if using)
  },
}


export default NextAuth(authOptions)
