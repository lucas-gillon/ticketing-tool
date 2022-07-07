import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../src/getDatabase";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;
  const pseudo = req.body.pseudo;
  const ticketTitle = req.body.ticket_title;
  const ticketContent = req.body.ticket_content;
  const uuid = uuidv4();
  console.log(uuid);
  const mongodb = await getDatabase();
  const userDB = await mongodb
    .db()
    .collection("users")
    .findOne({ email: email });
  const tempTickets = [JSON.parse(JSON.stringify(userDB?.tickets))];
  const temp = {
    id: uuid,
    email: email,
    pseudo: pseudo,
    ticket_title: ticketTitle,
    ticket_content: ticketContent,
  };
  tempTickets.push(temp);
  await mongodb
    .db()
    .collection("users")
    .updateOne({email: email}, {$set: {tickets: tempTickets}});
  res.end();
}
