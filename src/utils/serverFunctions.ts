'use only-server'

import brevo from '@getbrevo/brevo'

export async function sendEmail(subject: string, htmlConent: string, to: {name: string, email: string}[]){
    const apiInstance = new brevo.TransactionalEmailsApi();
    const sendSmtpEmail = new brevo.SendSmtpEmail()

    apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY as string
    )

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = `${htmlConent}`;
    sendSmtpEmail.sender = {
        name: process.env.APP_NAME as string,
        email: process.env.SENDER_EMAIL as string
    };
    sendSmtpEmail.to = to;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
}