import { PasswordChangedEmailParams } from "./typesEmails";

function buildEmailTemplate(html: string){
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Notificación</title>
      <style>
        .card {
          border: 1px solid #f6f6f6;
          border-radius: 11px;
          padding: 20px 40px;
          width: 50%;
          margin: auto;
          background-color: #fafaf9;
          font-size: 16px
        }

        .title{
            color: #1e3a8a;
            text-align: center;
            margin-bottom: 35px;
        }
      </style>
    </head>
    <body>
    <div class="card">
      <h1 class="title">${process.env.APP_NAME}</h1>
      ${html}
    </div>
    </body>
    </html>
  `
}

export function buildPasswordChangedEmail({ username, names, surnames, email }: PasswordChangedEmailParams) {
  const subject = `${process.env.APP_NAME} Cambio de contraseña`;
  const html  = `<div>
                    <h2>Se ha cambiado la contraseña exitosamente</h2>
                    
                    <p><strong>Usuario:</strong> ${username}</p>
                    <p><strong>Nombre:</strong> ${names} ${surnames}</p>
                    <p><strong>Email:</strong> ${email}</p>

                    <p style="margin-top:50px;">Si no realizaste este cambio, por favor contacta con soporte inmediatamente.</p>
                  </div>`;

  const htmlContent = buildEmailTemplate(html)

  return { subject, htmlContent };
}