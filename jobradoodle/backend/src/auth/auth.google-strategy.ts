import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/auth/auth.model';
import AuthService from 'src/auth/auth.service';
import { REDIRECT_URI } from 'src/main';

dotenv.config({ path: path.resolve(__dirname, '../../../../', '.env') });
const scopePrefix = 'https://www.googleapis.com/auth';

@Injectable()
export default class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: REDIRECT_URI,
      scope: [
        `${scopePrefix}/userinfo.email`,
        `${scopePrefix}/userinfo.profile`,
        `${scopePrefix}/gmail.readonly`,
      ],
    });
  }

  authorizationParams(): object {
    return {
      access_type: 'offline',
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const userDto: UserDto = {
      email: profile._json.email,
      googleUserId: profile.id,
      username: profile._json.email.split('@')[0],
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
    const validatedUser = await this.authService.validate(userDto);
    return validatedUser;
  }
}
