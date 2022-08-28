import { MailerService } from '@nest-modules/mailer';
import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Processor('sendMail-register-queue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-register-job')
  async execute(job: Job<CreateUserDTO>) {
    const { name, email } = job.data;

    await this.mailService.sendMail({
      to: email,
      from: 'Magodev Team <app@magodev.com>',
      subject: 'Seja bem-vindo(a) ao Magodev',
      text: `Seja bem-vindo ${name}! Seu cadastro foi realizado com sucesso.`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`On completed ${job.name}`);
  }

  @OnQueueError()
  onError(job: Job) {
    console.log(`On error ${job.name}`);
  }
}
