import { CreatedUserEmailParams, LoginEmailParams, PasswordChangedEmailParams, TwoFactorAuthEmailParams } from "./typesEmails";

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

        .btn{
          text-align: center;
          margin: auto;
          background: black;
          color: white;
          padding: 8px 14px;
          border-radius: 5px;
          text-decoration: none;
          display: block;
          max-width: 100px;
        }

        .btn:hover{
          opacity: 60%;
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

export function buildCreatedUserEmail({username, names, surnames, email, password}: CreatedUserEmailParams){
  const subject = `${process.env.APP_NAME} Creación de usuario`;
  const html  = `<div>
                    <h2>Creación de usuario</h2>
                    
                    <p><strong>Usuario:</strong> ${username}</p>
                    <p><strong>Nombre:</strong> ${names} ${surnames}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Contraseña:</strong> ${password}</p>

                    <a class="btn" style="margin: 10px auto color: white;" href="${process.env.APP_URL}:${process.env.APP_PORT}">Inciar sesion</a>

                    <p style="margin-top:50px;">Esta es una contraseña temporal, debes cambiarla al iniciar sesion.</p>
                  </div>
                `;

  const htmlContent = buildEmailTemplate(html)

  return { subject, htmlContent };
}

export function buildLoginEmail({username, names, surnames, email, fecha, ip, navegador, sistema}: LoginEmailParams){
  const subject = `${process.env.APP_NAME} Inicio de sesion`;
  const html  = `<div>
                    <h2>Inicio de sesion</h2>
                    
                    <p><strong>Usuario:</strong> ${username}</p>
                    <p><strong>Nombre:</strong> ${names} ${surnames}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Fecha de incio de sesion:</strong>${fecha}</p>

                    <br>

                    <p><strong>Direccion IP:</strong> ${ip}</p>
                    <p><strong>Navegador:</strong> ${navegador}</p>
                    <p><strong>Sistema:</strong> ${sistema}</p>

                    <p style="margin-top:50px;">Si tu no iniciaste sesion, por favor contacta con soporte inmediatamente.</p>
                  </div>
                `;

  const htmlContent = buildEmailTemplate(html)

  return { subject, htmlContent };
}

export function buildTwoFactorAuthEmail({username, names, surnames, email, fecha, code}: TwoFactorAuthEmailParams){
  const subject = `${process.env.APP_NAME} Codigo de confirmacion de inicio de sesion`;
  const html  = `<div>
                    <h2>Inicio de sesion de doble factor</h2>
                    
                    <p><strong>Usuario:</strong> ${username}</p>
                    <p><strong>Nombre:</strong> ${names} ${surnames}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Fecha de incio de sesion:</strong>${fecha}</p>

                    <br>

                    <p><strong>Codigo:</strong></p>
                    <h2>${code}</h2>

                    <p style="margin-top:50px;">Si tu no iniciaste sesion, por favor contacta con soporte inmediatamente.</p>
                  </div>
                `;

  const htmlContent = buildEmailTemplate(html)

  return { subject, htmlContent };
}