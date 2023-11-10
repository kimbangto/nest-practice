import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import { sessionOption } from './session/session-option';
import { deserializeUser, serializeUser } from './util/serializer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(session(sessionOption));

  app.use(passport.initialize());
  app.use(passport.session());

  // serializeUser();
  // deserializeUser();

  await app.listen(4000);
}
bootstrap();
