import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  const cursor = (await req.body.cursor) || 1;
  const count = (await req.body.count) || 20;

  const session = await getSession({ req });

  console.log(session);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log(token);

  if (token) {
    const octokit = new Octokit({
      auth: token.account.access_token,
    });
    try {
      console.log(cursor);
      const results = await octokit.request("GET /gists", {
        per_page: count || 20,
        page: cursor || 1,
      });

      return res.status(200).json({
        status: "Ok",
        data: results,
      });
    } catch (e) {
      return res.status(400).json({
        status: e.message,
      });
    }
  } else {
    const cursor = await req.body.cursor;
    const count = await req.body.count;
    const octokit = new Octokit({});
    const results = await octokit.request("GET /gists", {
      per_page: count || 20,
      page: cursor || 1,
    });
    return res.status(200).json({
      status: "Not Authenticated",
      data: results,
    });
  }
}

// if (session) {
// } else {
//   const cursor = await req.body.cursor;
//   const count = await req.body.count;
//   const octokit = new Octokit({});
//   const results = await octokit.request("GET /gists", {
//     per_page: count,
//     page: cursor,
//   });
//   return res.status(300).json({
//     status: "Not Authenticated",
//     data: results,
//   });
// }
