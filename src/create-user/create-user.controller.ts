import { MailerService } from '@nest-modules/mailer';
import { Body, Controller, Post } from '@nestjs/common';
import { SendMailProducerService } from '../jobs/sendMail-producer-service';
import { CreateUserDTO } from './create-user-dto';

@Controller('create-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducerService) {}

  @Post('/')
  async createUser(@Body() user: CreateUserDTO) {
    this.sendMailService.execute(user);

    return user;
  }
}
