import { Logger } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { users } from './seeder/users/data';
import { hashPassword } from '@src/utils/hash';
import { songs } from './seeder/songs/data';

const prisma = new PrismaService();
const logger = new Logger('Seed');

async function seed() {
  logger.log('Seeding database');

  try {
    // Reset database
    await prisma.user.deleteMany();
    await prisma.song.deleteMany();
    await prisma.artist.deleteMany();
    await prisma.category.deleteMany();
    await prisma.list.deleteMany();
    await prisma.favorite.deleteMany();
    await prisma.songCategory.deleteMany();
    await prisma.listSong.deleteMany();

    logger.log('Database reset successfully');

    // Seed users
    for (const user of users) {
      const hashedPassword = await hashPassword(user.password);

      await prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: hashedPassword,
          role: user.role,
        },
      });
    }

    logger.log('Users seeded successfully');

    // Seed songs
    const usersDB = await prisma.user.findMany();

    for (const song of songs) {
      await prisma.song.create({
        data: {
          title: song.title,
          lyrics: song.lyrics,
          initialPhrase: song.initialPhrase,
          artist: {
            connectOrCreate: {
              where: {
                slug: song.artist.slug,
              },
              create: song.artist,
            },
          },
          user: {
            connect: {
              id: usersDB[0].id,
            },
          },
          categories: {
            create: song.categories.map((category) => ({
              category: {
                connectOrCreate: {
                  where: {
                    name: category.toLowerCase(),
                  },
                  create: {
                    name: category.toLowerCase(),
                  },
                },
              },
            })),
          },
        },
      });
    }

    logger.log('Songs with categories and artist seeded successfully');
  } catch (error) {
    logger.error(error);
  }
}

seed();
