import { UsersService } from './../../users/users.service';
import { CanActivate, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(bearerToken, 'jwtPrivateKey') as any;
      return new Promise((resolve, reject) => {
        return this.usersService.getUserByEmail(decoded.email).then((user) => {
          if (user) {
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    } catch (ex) {
      throw new WsException(ex.message);
    }
  }
}
