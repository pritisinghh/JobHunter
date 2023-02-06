import User from 'src/auth/auth.model';
import { base64decode } from 'nodejs-base64';
import * as utf8 from 'utf8';
import OAuthClientHandler from './oauth-client-handler';

export class MailHandler {
  public static async fetchMails(user: User): Promise<any> {
    const oauthHandler: OAuthClientHandler = OAuthClientHandler.getInstance();
    await oauthHandler.refreshAccessToken(user);

    const emailResponse = await oauthHandler.gmail.users.messages.list({
      userId: user.googleUserId,
      maxResults: 20,
      q: 'from: greenhouse OR from: myworkday OR from:hire.lever.co',
    });

    const mailMimes = [];
    for (const mailId of emailResponse.data.messages) {
      const mailMime = await oauthHandler.gmail.users.messages.get({
        id: mailId.id,
        userId: user.googleUserId,
      });

      try {
        let emailBody: string = mailMime.data.payload.parts[0].body.data || '';
        emailBody = utf8.decode(base64decode(emailBody));
        mailMimes.push(emailBody);
      } catch (error) {
        continue;
      }
    }
    return mailMimes;
  }
}
