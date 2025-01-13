import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { config as dotenvConfig } from 'dotenv'; // Import dotenv

dotenvConfig();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000; // Default to port 4000

      app.enableCors({
        origin: "http://localhost:3000", // Frontend URL
        credentials: true,  
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',       
      });
    
  // Apply the global JWT guard
 // const reflector = app.get(Reflector);
  //app.useGlobalGuards(new JwtAuthGuard(reflector));

    await app.listen(PORT);
    console.log(`Backend is running on http://localhost:${PORT}`);

}
bootstrap();
