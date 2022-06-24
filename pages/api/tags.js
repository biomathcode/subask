// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  //   const searchData = req.body.search;

  const name = req.body.name;

  const session = getSession({ req });

  if (!session) {
    return res.status(300).json({ status: "not authenticated" });
  }

  switch (req.method) {
    case "GET":
      const tags = await prisma.tag.findMany({});
      return res.status(200).json({ data: tags });
    case "POST":
      const data = await prisma.tag.create({
        data: {
          name: name,
        },
      });
      return res.status(200).json({
        data: data,
      });
  }
}
