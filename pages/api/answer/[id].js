// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  console.log(id);
  switch (req.method) {
    case "GET":
      return res.status(200).json({ data: `Get the data ${id}` });
    case "POST":
      return res.status(200).json({ data: `Post request  ${id} ` });
    case "PUT":
      return res.status(200).json({ data: `Update response  ${id}` });
    case "DELETE":
      const deleteJson = await prisma.answer.delete({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: `Delete  ${id} `, data: deleteJson });
  }
}
