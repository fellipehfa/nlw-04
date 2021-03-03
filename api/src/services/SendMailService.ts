import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
  private client: Transporter
  constructor() {
    nodemailer.createTestAccount().then(account => {
      // Create a SMTP transporter object
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
      });

      this.client = transporter;
    });
  }

  /*Toda vez que temos uma função que retorna uma promisse com (async) 
  temos um await como resposta 
  */

  async execute(to: string, subject: string, body: string) {

    const message = await this.client.sendMail({
      to,
      subject,
      html: body,
      from: "NPS <noreplay@nps.com.br>"
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();