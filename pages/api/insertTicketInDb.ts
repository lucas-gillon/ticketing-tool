import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../src/getDatabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;
  const pseudo = req.body.pseudo;
  const ticketTitle = req.body.ticket_title;
  const ticketContent = req.body.ticket_content;
  console.log(req.body);
  const mongodb = await getDatabase();
  await mongodb
    .db()
    .collection("tickets")
    .insertOne({
      email: email,
      pseudo: pseudo,
      ticket_title: ticketTitle,
      ticket_content: ticketContent,
    });
  res.end();
}
