// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  //   const searchData = req.body.search;

  const data = await prisma.ask.findMany({
    where: {
      //   content: {
      //     search: searchData,
      //   },
      tags: {
        every: {
          OR: [
            {
              name: {
                contains: "css",
              },
            },
            {
              name: {
                contains: "javascript",
              },
            },
          ],
        },
      },
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
