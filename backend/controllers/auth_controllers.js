const  { pool, sequelize } = require('../config/db.js');
const { users } = require('../config/models.js')
const { PasswordHasher, GetData } = require('../utils/utils.js');
const { SendEmail, SendEmailForgotPassword} = require ('../utils/mail_utils.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class Auth_and_Reg {
    // регистрация
    async Register(req, res){
        const {name, phone, email, password} = req.body;
        const t = await sequelize.transaction();

        try{
            const password_hash = await PasswordHasher(password);

            const reg = await users.create(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    password_hash: password_hash,
                },
                { transaction: t}
            )
            
            const userId = reg.id
            await t.commit()
            return res.status(200).json({ id: userId, message: 'Пользователь зарегистрирован' });
        }
        catch(err){
            if (t.finished !== 'commit') {
                await t.rollback(); // Откатываем транзакцию, если она не была зафиксирована
            }
            console.log("Ошибка при добавлении пользователя:", err);
            if (err.code === '23505') {
              res.status(409).json({ message: 'Имя пользователя уже существует!' });
            } else {
                // TODO надо добавить обработчик ошибок
                res.status(500).json({ message: "Ошибка сервера",
                error: err
               });
            }
        }
    }

    async ConfirmRegisterMailSendler(req, res){
        const { email, username, id } = req.body;

        try{
            await SendEmail(email, username, id);
            res.status(200).json({message:"Письмо отправлено"})
        }
        catch(err){
            console.error(err)
        }
    }
    // подтверждение регистрации
    async ConfirmRegister(req, res){
        const verify_token = req.params.token;
        const t = await sequelize.transaction();

        try{
            const decoded = jwt.verify(verify_token, process.env.MAIL_SECRET);

            if (!decoded || !decoded.id){
                return res.status(403);
            }

            const confreg = await users.update(
                {
                    confirm_reg: true,
                    where:{
                        id: decoded.id
                    }
                },
                { transaction: t}
            )
  
            const newToken = jwt.sign({username: decoded.id}, process.env.MAIL_SECRET, {expiresIn: '3s'})
            
            await t.commit()
            res.redirect(`http://localhost:3000/success?newToken=${newToken}`) //ссылка должна быть другой 
        }
        catch(err){
            await t.rollback()
            console.error(err)
        }
    }
    // логин
    async Login(req, res){ 
        const client = await pool.connect();
        const {email, password} = req.body;
        const bdData = await GetData(email) 

        try{    
            if (!bdData || !bdData.id){
                return res.status(404).json({message:"Пользователь c данным Email не найден"});
            }

            if (bdData.confirm_reg === false){
                return res.status(400).json({message:"Ваш аккаунт не подтверждён."});
            }

            const isPasswordMatch = await bcrypt.compare(password, bdData.password_hash);

            if(isPasswordMatch === true){
                const refresh_token = jwt.sign({ id: bdData.id, confirm_reg: bdData.confirm_reg }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
                const acess_token = jwt.sign({ id: bdData.id, confirm_reg: bdData.confirm_reg }, process.env.ACESS_SECRET, { expiresIn: '1h' });
    
                // console.log('Токены при логине:',"Acess:",acess_token, "Refresh:",refresh_token);
                return res.status(200).json({
                    message: 'Успешный вход!',
                    acess_token,
                    refresh_token,
                    isConfirmed: bdData.confirm_reg,
                });
            }
            else {
            return res.status(409).json({ message: 'Пароль не совпадает!' });
            }

        }
        catch(err){
            console.error(err)
        }
        finally{
            client.release()
        }
    }
    // замена пароля через мыло
    async ForgotPasswordMailSendler (req, res) {
        const username = req.body.username;
        const bdData = await GetData(username);

          try{
            const forgotPassword_token = jwt.sign({username: username}, process.env.MAIL_SECRET, {expiresIn: '1h'});
            await SendEmailForgotPassword(bdData.email);
            // console.log("письмо отправлено. Токен:", forgotPassword_token)

            res.status(200).json({ 
              message: "Письмо успешно отправлено!",
              token: forgotPassword_token
            });
          } 
          catch (err) {
            console.error("Ошибка при отправке письма:", err);
            res.status(500).json({ message: "Ошибка сервера при отправке письма." });
          }
        };
      // замена пароля с клиента
      async ForgotPassword (req, res) {
        const client = await pool.connect();
        const token = req.body.token;
        const password = req.body.password;
      
        try{
        const decoded = jwt.verify(token, process.env.MAIL_SECRET)
      
        if (!decoded || !decoded.username) {
          return res.sendStatus(403).json({message:"Неверный токен"}); 
        }
      
        if (!password || password.length < 4) {
          return res.status(400).json({ message: "Пароль должен быть не менее 4 символов" });
        }
      
        const hashedPassword = await PasswordHasher(password);
        const fgpass = await users.create(
            {
                password_hash: hashedPassword,
                where:{
                    username: decoded.username
                }
            },
            { transaction: t }
        )

        if (result.rowCount === 0) {
          return res.status(404).json({ message: "Пользователь не найден" });
        }

        await t.commit()
        res.status(200).json({ message: "Пароль успешно изменён" });
        }
        catch(err){
            await t.rollback()
            console.error(err);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
      };
    
}

module.exports = new Auth_and_Reg();