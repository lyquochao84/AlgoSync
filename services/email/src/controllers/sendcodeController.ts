import { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';

const EMAIL_FROM = process.env.EMAIL_FROM;

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendCode = async (req: Request, res: Response) => {
}

export const verifyCode = async (req: Request, res: Response) => {
    
}