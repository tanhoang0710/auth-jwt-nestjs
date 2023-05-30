import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'rt-secret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    console.log(
      '🚀 ~ file: rt.strategy.ts:18 ~ RtStrategy ~ validate ~ payload:',
      payload,
    );
    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
