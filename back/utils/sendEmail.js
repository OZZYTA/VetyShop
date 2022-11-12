const nodemailer= require("nodemailer")

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "ozzyta@outlook.com",
          pass: "lhqyxlcozvmnrlkw"
        }
      });
    const mensaje={
        from: "VetyShop Store <ozzyta@outlook.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }

    await transport.sendMail(mensaje)
}

module.exports= sendEmail;