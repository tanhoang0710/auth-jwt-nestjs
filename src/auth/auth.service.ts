import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import users from '../users.json';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signinLocal(dto: AuthDto) {
    // retrive user
    const user = users.find((user) => user.email === dto.email);
    if (!user) throw new NotFoundException('Credentials incorrect');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Credentials incorrect');
    return this.signUser(user.id, user.email, 'user');
  }

  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      claim: type,
    });
  }
}
