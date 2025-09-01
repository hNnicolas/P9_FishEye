const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();

const photographersData = require("../data/photographer.json");
const mediaData = require("../data/media.json");

async function main() {
  const createdPhotographers = await prisma.photographer.createMany({
    data: photographersData,
  });
  console.log("Photographers inserted:", createdPhotographers.count);

  const createdMedia = await prisma.media.createMany({
    data: mediaData,
  });
  console.log("Media inserted:", createdMedia.count);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
