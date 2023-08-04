import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtikelModule } from './artikel/artikel.module';
import { ProductModule } from './product/product.module';
import { BundlingModule } from './bundling/bundling.module';
import { TestimoniModule } from './testimoni/testimoni.module';
import { AboutModule } from './about/about.module';
import { VisimisiModule } from './visimisi/visimisi.module';
import { InfografisModule } from './infografis/infografis.module';
import { BannerModule } from './banner/banner.module';
import { GalleryModule } from './gallery/gallery.module';
import { PartnerModule } from './partner/partner.module';
import { ContactModule } from './contact/contact.module';
import { WhyLveModule } from './why-lve/why-lve.module';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    ArtikelModule,
    ProductModule,
    BundlingModule,
    TestimoniModule,
    AboutModule,
    VisimisiModule,
    InfografisModule,
    BannerModule,
    GalleryModule,
    PartnerModule,
    ContactModule,
    WhyLveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
