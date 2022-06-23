// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  //   const searchData = req.body.search;

  const data = await prisma.tag.findMany({});

  res.status(200).json({ data: data });
}
