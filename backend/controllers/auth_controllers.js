const  { pool } = require('../config/db.js');
const { PasswordHasher } = require('../utils/utils.js');
const { SendEmail } = require ('../utils/mail_utils.js');
const { MAIL_SECRET } = require('../config/config.js');
const jwt = require('jsonwebtoken');

class Auth_and_Reg {
    async Register(req, res){
        const client = await pool.connect();
        const {name, phone, email, password} = req.body;
        const password_hash = await PasswordHasher(password);

        try{

            const result = await client.query('INSERT INTO users (name, email, phone, password_hash) VALUES($1, $2, $3, $4) RETURNING id', 
                [name, email, phone, password_hash]
            );

            const userId = result.rows[0].id;
            return res.status(200).json({ id: userId, message: 'Пользователь зарегистрирован' });
        }
        catch(err){
            console.err("Ошибка при добавлении пользователя:", error);
            if (err.code === '23505') {
              res.status(409).json({ message: 'Имя пользователя уже существует!' });
            } else {
              res.status(500).json({ message: "Ошибка сервера" });
            }
        }
        finally{
            client.release()
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

    async ConfirmRegister(req, res){
        const client = await pool.connect();
        const verify_token = req.params.token;

        try{
            const decoded = jwt.verify(verify_token, MAIL_SECRET);

            if (!decoded || !decoded.id){
                return res.status(403);
            }

            await client.query('UPDATE users SET confirm_reg = true WHERE id = $1', 
                [decoded.id]
            )
            const newToken = jwt.sign({username: decoded.id}, MAIL_SECRET, {expiresIn: '3s'})
            
            res.redirect(`http://localhost:3001/success?newToken=${newToken}`) //ссылка должна быть другой 
        }
        catch(err){
            console.error(err)
        }
        finally{
            client.release()
        }

    }
    
}

module.exports = new Auth_and_Reg()