import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
      // Enable CORS
      app.enableCors({
        origin: "http://localhost:3001", // Frontend URL
        credentials: true,  
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',            // Allow cookies, if needed
      });
   
    
  // Apply the global JWT guard
  const reflector = app.get(Reflector);
  //app.useGlobalGuards(new JwtAuthGuard(reflector));


    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
