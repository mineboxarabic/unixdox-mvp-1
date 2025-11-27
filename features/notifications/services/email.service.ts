import nodemailer from 'nodemailer';

interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: EmailAttachment[];
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      console.warn('SMTP configuration is missing. Emails will not be sent.');
    }

    this.transporter = nodemailer.createTransport({
      host: host || 'localhost',
      port: port,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  async sendEmail({ to, subject, text, html, attachments }: SendEmailOptions): Promise<void> {
    if (!process.env.SMTP_HOST) {
      console.error('SMTP_HOST is not defined');
      throw new Error('SMTP configuration is missing');
    }

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || '"Unidox" <noreply@unidox.com>',
        to,
        subject,
        text,
        html,
        attachments,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email: ' + (error instanceof Error ? error.message : String(error)));
    }
  }
}

export const emailService = new EmailService();
