const jwt = require('jsonwebtoken')
const {ACESS_SECRET, REFRESH_SECRET} = require('../config/config.js');

exports.autorizate_token = (req, res, next) => {
  const acessHeaders = req.headers['authorization']; 
//   console.log(req.headers.authorization, 'Хедеры')

  if (!acessHeaders) {
      return res.status(401).json({ message: 'Токен отсутствует!' }); 
  }

  const acess_token = acessHeaders.split(' ')[1]
//   console.log(acess_token, "Токен доступа")

  jwt.verify(acess_token, ACESS_SECRET, (err, acessdata) => {
    console.log('Данные из токена:', acessdata);

      if (err) {
          console.error('Ошибка верификации токена:', err);
          next()
      }

      if (acessdata.confirm_reg === false) {
          return res.status(401).json({ message: 'Ваш аккаунт не подтверждён!' });
      }

      req.id = acessdata.id;
      next();
  });
};

exports.UpdateTokens = (req, res, next) => {  
    const acessHeaders = req.headers['authorization']
    const refreshHeaders = req.headers['refresh_token']

    if(!acessHeaders || !refreshHeaders) {
        return res.status(403).json({message: "Токены отсутствуют"})
    }

    const acess_token = acessHeaders.split(' ')[1]
    const refresh_token = refreshHeaders.split(' ')[1]

    jwt.verify(acess_token, ACESS_SECRET, (err, acessdata) => {
        if (!err) {
            req.id = acessdata.id;
            if (acessdata.confirm_reg === false) {
                return res.status(401).json(
                    {   message: 'Ваш аккаунт не подтверждён!',}
                );
            }
            return next();
        }
        if (err && err.name === 'TokenExpiredError') {
            jwt.verify(refresh_token, REFRESH_SECRET, (err, refreshData) => {
                
                if (err && err.name === 'TokenExpiredError') {
                    console.log('Refresh токен не действителен!')
                    return res.status(403).json({
                        message: "Refresh-токен истёк. Авторизуйтесь снова.",
                        clearTokens: true,
                    });
                } else if (err) {
                    return res.status(403).json({
                        message: "Ошибка верификации refresh-токена.",
                    });
                }
    
                const newAcessToken = jwt.sign(
                    { id: refreshData.id, confirm_reg: refreshData.confirm_reg },
                    ACESS_SECRET,
                    { expiresIn: '1h' }
                );
    
                const newRefreshToken = jwt.sign(
                    { id: refreshData.id, confirm_reg: refreshData.confirm_reg },
                    REFRESH_SECRET,
                    { expiresIn: '7d' }
                );

                // console.log("НОВЫЕ ТОКЕНЫ:", newAcessToken, '------------------------', newRefreshToken)

                console.log('Обновление токенов!')
                return res.status(209).json({
                    message: "Токены обновлены",
                    acess_token: newAcessToken,
                    refresh_token: newRefreshToken,
                });
            });
        } else {
            return res.status(403).json({
                message: "Ошибка верификации access-токена.",
            });
        }
    });
}


