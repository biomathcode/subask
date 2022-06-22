// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ data: "Get the data" });
    case "POST":
      return res.status(200).json({ data: "Post request " });
    case "PUT":
      return res.status(200).json({ data: "Update response" });
    case "DELETE":
      return res.status(200).json({ data: "Delete " });
  }
}
