import { Resend } from 'resend';
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

/**
 * Email service with two backends:
 * - Resend (HTTP API): used in production / Railway where SMTP ports are blocked
 * - Nodemailer (SMTP): used locally or when RESEND_API_KEY is not set
 */
export class EmailService {
  private resend: Resend | null = null;
  private transporterPromise: Promise<nodemailer.Transporter> | null = null;
  private isTestAccount = false;

  constructor() {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      this.resend = new Resend(resendKey);
    } else {
      // Fallback to SMTP/Ethereal for local dev
      this.transporterPromise = this.initTransporter();
    }
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
        secure: port === 465,
        auth: {
          user: user,
          pass: pass,
        },
        pool: true,
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        socketTimeout: 30000,
        dnsV6Order: false,
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
    if (this.resend) {
      return this.sendViaResend({ to, subject, text, html, attachments });
    }
    return this.sendViaSMTP({ to, subject, text, html, attachments });
  }

  private async sendViaResend({ to, subject, text, html, attachments }: SendEmailOptions): Promise<void> {
    const from = process.env.EMAIL_FROM || 'Unidox <onboarding@resend.dev>';

    try {
      const { error } = await this.resend!.emails.send({
        from,
        to: [to],
        subject,
        text,
        html: html || undefined,
        attachments: attachments?.map((a) => ({
          filename: a.filename,
          content: typeof a.content === 'string' ? Buffer.from(a.content) : a.content,
        })),
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('✅ Email sent successfully via Resend!');
    } catch (error) {
      console.error('Error sending email via Resend:', error);
      throw new Error('Failed to send email: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  private async sendViaSMTP({ to, subject, text, html, attachments }: SendEmailOptions): Promise<void> {
    try {
      const transporter = await this.transporterPromise!;

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Unidox" <noreply@unidox.com>',
        to,
        subject,
        text,
        html,
        attachments,
      });

      console.log('✅ Email sent successfully via SMTP!');
      
      if (this.isTestAccount) {
        console.log('📧 Preview your test email at: %s', nodemailer.getTestMessageUrl(info));
      }
    } catch (error) {
      console.error('Error sending email via SMTP:', error);
      throw new Error('Failed to send email: ' + (error instanceof Error ? error.message : String(error)));
    }
  }
}

export const emailService = new EmailService();
