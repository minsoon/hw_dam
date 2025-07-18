// lib/auth-options.js
import KeycloakProvider from 'next-auth/providers/keycloak'
import { parseAccessToken } from '@/shared/lib/format'

const isDev = process.env.NODE_ENV === 'development'

// Function to request a new access token using the refresh token from Keycloak
async function requestRefreshOfAccessToken(token) {
  return fetch(
    `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken, // Use the stored refresh token
      }),
      method: 'POST',
      cache: 'no-store', // Ensure we always fetch the latest token
    }
  )
}

export const authOptions = {
  debug: isDev,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || '',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || '',
      issuer: process.env.KEYCLOAK_ISSUER, // The URL of your Keycloak authorization server
    }),
  ],

  pages: {
    //signIn: '/auth/signin', // Custom sign-in page URL
    //signOut: '/auth/signout', // Custom sign-out page URL
    //error: '/auth/error', // Custom error page path
  },
  events: {
    async signOut({ token }) {
      // When a user signs out, attempt to revoke the Keycloak session
      const logOutUrl = new URL(
        `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`
      )
      logOutUrl.searchParams.set('id_token_hint', token.idToken) // Send the ID token hint to Keycloak for proper logout
      await fetch(logOutUrl)
    },
  },
  strategy: 'jwt',
  session: {
    maxAge: 60 * 30, // session cookie will expire after 30 minutes of inactivity in the browser
  },
  callbacks: {
    // This callback is called whenever a JWT is created (e.g., at sign in) or updated (e.g., via token refresh)
    async jwt({ token, account, profile }) {
      // Initial sign in

      if (account) {
        const newToken = {
          // Store the access token, user ID, session ID, ID token, user info, expiry time, and roles in the JWT
          accessToken: account.access_token,
          id: profile?.sub,
          sessionId: profile?.sid,
          idToken: account.id_token,
          expiresAt: account.expires_at || Math.floor(Date.now() / 1000 + account.expires_in), // expires_at handling: relying on account.expires_at isn't always present depending on the provider or openid-client.
          realmAccessRoles: parseAccessToken(account.access_token)?.realm_access?.roles || [], // Extract realm roles from the access token
          resourceAccessRoles: parseAccessToken(account.access_token)?.resource_access?.account?.roles || [], // Extract resource roles for the 'account' client
          rolesGroup: profile?.groups || [], // Extract user's group memberships
          refreshToken: account.refresh_token, // Store the refresh token in the JWT for future token refreshes
          name: profile.name,
        }

        // console.log(' jwt ~ newToken:', newToken)

        return newToken
      }

      // Return previous token if the access token has not expired yet
      // if (Date.now() < token.expiresAt * 1000 - 60 * 1000) {
      // gives app 5 minutes of buffer to refresh before expiry
      if (Date.now() < token.expiresAt * 1000 - 5 * 60 * 1000) {
        // console.log('Return previous token if the access token has not expired yet')
        // console.log('Refresh token expires in minutes: ', (token.expiresAt - 60 - Math.floor(Date.now() / 1000)) / 60)

        return token
      }

      // If the access token has expired, try to refresh it
      else {
        // console.log('Access token expired, refreshing...')
        try {
          const response = await requestRefreshOfAccessToken(token)

          // console.log('Access token refresh response:', response)

          const tokens = await response.json()

          if (!response.ok) throw tokens // Throw an error if the refresh request fails

          // If refresh is successful, update the token object with the new tokens
          return {
            ...token,
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + tokens.expires_in), // Calculate new expiry time
            refreshToken: tokens.refresh_token ?? token.refreshToken, // Use the new refresh token if provided, otherwise keep the old one
          }
        } catch (error) {
          console.error('Error refreshing access token', error)

          // If refresh fails, return the token with an error flag to trigger sign-in on the client
          return { ...token, error: 'RefreshAccessTokenError' }
        }
      }
    },

    // This callback is called whenever a session is checked on the server
    async session({ session, token }) {
      // console.log('Token in session callback:', token)

      // Pass the access token and user roles to the client-side session object
      session.accessToken = token.accessToken

      // session.realmAccessRoles = token.realmAccessRoles
      // session.resourceAccessRoles = token.resourceAccessRoles
      // session.rolesGroup = token.rolesGroup
      // session.sessionId = token.sessionId
      // session.user = token.user

      // including the error in the session
      if (token.error) {
        session.error = token.error
      }

      delete session.user

      // console.log(' session ~ session:', session)

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret used to encrypt the JWT
}
