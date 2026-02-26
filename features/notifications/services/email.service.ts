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
  private transporterPromise: Promise<nodemailer.Transporter>;
  private isTestAccount = false;

  constructor() {
    this.transporterPromise = this.initTransporter();
  }

  private async initTransporter(): Promise<nodemailer.Transporter> {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
      return nodemailer.createTransport({
        host: host,
        port: port,
        secure: port === 465, // true for 465, false for 587
        auth: {
          user: user,
          pass: pass,
        },
        // Connection optimizations
        pool: true,
        connectionTimeout: 20000, // 20 seconds
        greetingTimeout: 20000,
        socketTimeout: 30000,
        // Networking fixes
        dnsV6Order: false, // Force IPv4
        tls: {
          rejectUnauthorized: false,
          servername: host
        }
      } as any);
    } else {
      console.warn('SMTP configuration is missing. Generating Ethereal Email test account...');
      const testAccount = await nodemailer.createTestAccount();
      this.isTestAccount = true;
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      } as any);
    }
  }

  async sendEmail({ to, subject, text, html, attachments }: SendEmailOptions): Promise<void> {
    try {
      const transporter = await this.transporterPromise;

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Unidox" <noreply@unidox.com>',
        to,
        subject,
        text,
        html,
        attachments,
      });

      console.log('✅ Email sent successfully!');
      
      if (this.isTestAccount) {
        console.log('📧 Preview your test email at: %s', nodemailer.getTestMessageUrl(info));
      }
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email: ' + (error instanceof Error ? error.message : String(error)));
    }
  }
}

export const emailService = new EmailService();
