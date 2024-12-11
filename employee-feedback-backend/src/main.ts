import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
    
  // Apply the global JWT guard
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));


    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
