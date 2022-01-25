import { SocketInsideGateway } from './socket-inside.gateway';
import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';

@Module({
  imports: [],
  controllers: [],
  providers: [UsersService, ...usersProviders, SocketInsideGateway],
})
export class SocketInsideModule {}
