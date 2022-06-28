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
