// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ data: "Get the data" });
    case "POST":
      const gistId = req.body.gistId;
      const gistFile = req.body.gistFile;
      const askid = req.body.askid;
      const authorId = req.body.authorId;
      const response = await prisma.answer.create({
        data: {
          gistId: gistId,
          gistFile: gistFile,
          askid: askid,
          authorId: authorId,
        },
        select: {
          author: true,
          authorId: true,
          gistFile: true,
          id: true,
          askid: true,
          answerTo: true,
        },
      });
      return res.status(200).json({ data: response });
    case "PUT":
      return res.status(200).json({ data: "Update response" });
    case "DELETE":
      return res.status(200).json({ data: "Delete " });
  }
}
