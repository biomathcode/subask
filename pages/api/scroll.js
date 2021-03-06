import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const data = await prisma.ask.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      answers: true,
      content: true,
      tags: true,
      id: true,

      author: true,
    },
  });

  res.status(200).json({ data: data });
}
