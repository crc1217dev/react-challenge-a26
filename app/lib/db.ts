import { PrismaClient } from "../generated/prisma";

const db = new PrismaClient();
const users = await db.user.findMany({
  where: { id: 1 },
  include: {
    Tweet: true,
  },
});
console.log(users);
export default db;
