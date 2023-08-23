import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(username: string, password: string): Promise<any> {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    this.comparePassword(password, user.password);
    // generate jwt
    const payload = { sub: user.id, username: user.username };
    const jwt = await this.jwtService.signAsync(payload);
    console.log(jwt);
    return {
      access_token: jwt,
    };
  }

  comparePassword(password, userpassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, userpassword, (err, result) => {
        if (result) {
          return resolve('ok');
        } else {
          return reject('not ok');
        }
      });
    });
  }
}
