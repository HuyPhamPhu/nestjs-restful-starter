import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserLoginResponseDto extends UserDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  constructor(user: User, accessToken?: string, refreshToken?: string) {
    super(user);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
