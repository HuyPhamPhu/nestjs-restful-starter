import { UserLoginRequestDto } from './dto/user-login-request.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Delete,
  Req,
  UseGuards,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AtGuard, RtGuard } from '../common/guards';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: UserLoginResponseDto })
  register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserLoginResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserLoginResponseDto })
  login(
    @Body() userLoginRequestDto: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    return this.usersService.login(userLoginRequestDto);
  }

  @Post('logout')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  logout(@Req() request) {
    return this.usersService.logout(request.user.id);
  }

  @Post('refresh')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() request) {
    return this.usersService.refreshTokens(
      request.user.id,
      request.user.refreshToken,
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiOkResponse({ type: [UserDto] })
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiOkResponse({ type: UserDto })
  async getUser(@Req() request): Promise<UserDto> {
    return this.usersService.getUser(request.user.id);
  }

  @Put('me')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiOkResponse({ type: UserDto })
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ): Promise<UserDto> {
    return this.usersService.update(request.user.id, updateUserDto);
  }

  @Delete('me')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiOkResponse({ type: UserDto })
  delete(@Req() request): Promise<void> {
    return this.usersService.delete(request.user.id);
  }
}
