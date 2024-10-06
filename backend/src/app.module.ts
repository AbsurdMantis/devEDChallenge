import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './users/user.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
