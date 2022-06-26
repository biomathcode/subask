// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tr } from "date-fns/locale";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      const getAsk = await prisma.ask.findUnique({
        where: {
          id: id,
        },
        select: {
          authorId: true,
          answers: true,
          content: true,
          id: true,
          author: true,
          createdAt: true,
        },
      });

      const getAnswers = await prisma.answer.findMany({
        where: {
          askid: id,
        },
        select: {
          author: true,
          id: true,
          gistFile: true,
          gistId: true,
        },
      });

      return res.status(200).json({ data: getAsk, answers: getAnswers });
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
