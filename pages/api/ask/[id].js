// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      const getAsk = await prisma.ask.findFirst({
        where: {
          id: id,
        },
        select: {
          answers: true,
          content: true,
          id: true,
          author: true,
          createdAt: true,
        },
      });

      return res.status(200).json({ data: getAsk });
    case "PUT":
      return res.status(200).json({ data: `Update response  ${id}` });
    case "DELETE":
      const data = prisma.ask.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ data: data });
  }
}
