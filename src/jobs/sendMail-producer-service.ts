import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { CreateUserDTO } from './../create-user/create-user-dto';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('sendMail-register-queue') private queue: Queue) {}

  async execute(user: CreateUserDTO) {
    await this.queue.add('sendMail-register-job', user);
  }
}
