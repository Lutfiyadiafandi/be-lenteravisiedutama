import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://lenteravisiedutama.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const sess: session.SessionOptions = {
    secret: 'keyboard cat',
    cookie: {},
  };

  if (app.get('env') === 'production') {
    app.getHttpAdapter().getInstance().set('trust proxy', 1);
    sess.cookie.secure = true;
    sess.cookie.sameSite = 'none';
    app.use(function (req, res, next) {
      res.setHeader(
        'Access-Control-Allow-Origin',
        '*',
        'Set-Cookie',
        'cross-site-cookie=whatever; SameSite=None; Secure',
      );
      next();
    });
  }
  app.use(session(sess));
  await app.listen(4000);
}
bootstrap();
