import { Module } from '@nestjs/common';
import { UserController } from './user/controller/user.controller';
import { databaseProviders } from './database.provider';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './gateway/event.module';

@Module({
  imports: [
    User,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    EventsModule,
  ],
  controllers: [UserController, AuthController],
  providers: [...databaseProviders, AuthService],
  exports: [...databaseProviders, AuthService],
})
export class AppModule {}
