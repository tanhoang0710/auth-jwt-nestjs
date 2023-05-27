import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: 'SECRET', // protect this, move to env var,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }); // config
  }

  async validate(payload: any): Promise<any> {
    // can validate more
    // const user = await this.userService.getById(payload.sub);

    return {
      id: payload.sub,
      name: payload.name,
    };
  }
}
