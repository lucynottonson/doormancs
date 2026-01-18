import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { config } from '../../../lib/config'; 

const resend = new Resend(config.resendApiKey);

export async function POST(request: Request) {
  const { to, subject, html } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'DCS <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: html,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}