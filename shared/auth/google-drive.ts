import { google } from 'googleapis';
import { prisma } from '@/shared/config/prisma';
import { OAuth2Client } from 'google-auth-library';

export async function getGoogleDriveAuth(userId: string): Promise<OAuth2Client> {
  const account = await prisma.account.findFirst({
    where: {
      userId: userId,
      provider: 'google',
    },
  });

  if (!account) {
    throw new Error('Google account not linked');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    // expiry_date: account.expires_at ? account.expires_at * 1000 : undefined, // Optional if we trust refresh token
  });

  // If we have a refresh token, we can ensure the token is fresh
  // The library handles refreshing automatically if refresh_token is set and access_token is expired/invalid
  // provided we handle the 'tokens' event or just let it do its thing.
  // However, since we store tokens in DB, we might want to update them if they change.
  // For now, let's just rely on the library using the refresh token if needed.

  return oauth2Client;
}
