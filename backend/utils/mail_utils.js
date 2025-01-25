const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "petrlensin011@gmail.com", // Надо поменять
      pass: "mjuk nxoo wqgr cxig",
    },
  })

async function SendEmail(email, username, id) {
    const verify_token = jwt.sign({username: username, id: id}, process.env.MAIL_SECRET, {expiresIn: '9h'})
    const info = await transporter.sendMail({
      from: 'petrlensin011@gmail.com', // Надо изменить почту отправителя
      to: email, // list of receivers
      subject: "Подтверждение регистрации", 
      text: "Вы зарегистрировались, вам осталось подтвердить вашу регистрацию!", 
      html: `<p>Перейдите по <a href="http://localhost:5000/user/get_user/${verify_token}" target="_blank">этой ссылке</a> для дальнейших действий.</p>`
    });

  }

async function SendEmailForgotPassword(email) {
  try{
  const info = await transporter.sendMail({
    from: 'petrlensin011@gmail.com', // Заменить
    to: email, 
    subject: "Hello ✔",
    text: "Hello world?", 
    html: `<p>Перейдите по <a href="http://localhost:3001/forgotpassword" target="_blank">этой ссылке</a> для дальнейших действий.</p>` // Заменить
  })}
  catch(err){
    console.log(err)
  }
}

module.exports = {
    SendEmail,
    SendEmailForgotPassword,
}