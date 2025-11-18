import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from './app.module.js';
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from 'path';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableCors({
        origin: '*',
        credentials: true
    });
    // Статическая раздача файлов из папки uploads
    app.useStaticAssets(join(process.cwd(), 'uploads'), {
        prefix: '/uploads/',
    });
    const config = app.get(ConfigService);
    const port = Number(config.get('API_PORT')) || 3001;
    await app.listen(port);
    console.log(`API ready on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map