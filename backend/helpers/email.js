import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {

    const {nombre, email, token} = datos
    console.log(datos, 'desde helpers')
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "060323a6222ba8",
          pass: "516c940af60095"
        }
      });

    const info = await transport.sendMail({
        from: '"UpTask - Administra tu Proyecto" <suport@uptask.com>',
        to: email, 
        subject: "UpTask - Confirma tu Cuenta ✔", 
        text: "Ya puedes confirmar tu cuenta para gestionar tus proyectos",
        html: `
            <b>Hola ${nombre} tu cuenta ya esta casi lista, solo falta la confirmacion en el seguinte enlase:</b>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>
        
            `, 
    })
}

export const emailOlvidePassword = async (datos) => {

  const {nombre, email, token} = datos

  console.log(datos, 'desde helpers')

  var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "060323a6222ba8",
        pass: "516c940af60095"
      }
    });

  const info = await transport.sendMail({
      from: '"UpTask - Administra tu Proyecto" <suport@uptask.com>',
      to: email, 
      subject: "UpTask - Reestablece tu password ✔", 
      text: "Ya puedes Reestablecer tu password para gestionar tus proyectos",
      html: `
          <b>Hola ${nombre} has solicitado Reestablecer tu password, solo falta la confirmacion en el seguinte enlase:</b>
          <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablece tu password</a>
      
          `, 
  })
}
