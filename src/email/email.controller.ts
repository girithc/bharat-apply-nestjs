import {
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('email')
export class EmailController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Post()
  sendEmail(@GetUser('id') userId: number) {
    console.log('sendEmail()');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(
      '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',
    );
    const msg = {
      to: 'test@example.com', // Change to your recipient
      from: 'test@example.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
