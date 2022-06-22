import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const data = await prisma.ask.findMany({
        include: {
          answers: true,
          tags: true,
          author: true,
        },
      });
      return res.status(200).json({ data: data });
    case "POST":
      const content = req.body.content;

      const email = req.body.email;

      const tags = req.body.tags;

      const createask = await prisma.ask.create({
        data: {
          content: content,
          author: {
            connect: {
              email: email,
            },
          },
          tags: {
            connect: tags,
          },
        },
      });
      return res.status(200).json({ data: createask });
    case "PUT":
      return res.status(200).json({ data: "Update response" });
    case "DELETE":
      return res.status(200).json({ data: "Delete " });
  }
}
