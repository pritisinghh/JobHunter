import * as dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { gmail_v1, google } from 'googleapis';
import User from 'src/auth/auth.model';
import { REDIRECT_URI } from 'src/main';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../', '.env') });

export default class OAuthClientHandler {
  private static instance: OAuthClientHandler = undefined;
  private _gmail: gmail_v1.Gmail;
  private _oauth2Client: OAuth2Client;

  private constructor() {
    this._oauth2Client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
    });

    this._gmail = google.gmail({
      version: 'v1',
      auth: this._oauth2Client,
    });
  }

  public static getInstance(): OAuthClientHandler {
    if (!this.instance) this.instance = new OAuthClientHandler();
    return this.instance;
  }

  get gmail(): gmail_v1.Gmail {
    return this._gmail;
  }

  get oAuth2Client(): OAuth2Client {
    return this._oauth2Client;
  }

  public async refreshAccessToken(user: User): Promise<void> {
    this._oauth2Client.setCredentials({
      refresh_token: user.refreshToken,
    });

    const response = await this.oAuth2Client.refreshAccessToken();
    if (response && response.credentials.refresh_token) {
      user.refreshToken = response.credentials.refresh_token;
      await user.save();
    }
  }
}
