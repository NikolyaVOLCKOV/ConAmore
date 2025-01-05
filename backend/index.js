const express = require('express')
const helmet = require('helmet');
const cors = require('cors')
const app = express()

app.use(cors({
    host: 'http://localhost:5000',
    origin: 'http://localhost:3001', //нало поменять маршу
    methods: 'GET, POST, PUT, DELETE, OPTIONS', 
    allowedHeaders: ['Authorization', 'refresh_token', 'Content-Type'],
    credentials: true 
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

  app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-inline'"],
            "style-src": ["'self'", "'unsafe-inline'"],
            "img-src": ["'self'", "data:", "https:"],
            "connect-src": ["'self'", "http://localhost:5000"],
        },
    },
  }));

  app.use(helmet.noSniff())

app.use('/auth', require("./routers/auth"))
app.use('/products', require("./routers/products"))

app.listen(5000, (err) => {
  if (err) {
    console.error("Ошибка при запуске сервера:", err);
  } else {
    console.log('Готов на порту 5000');
  }
});

